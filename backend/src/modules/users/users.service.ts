import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    googleId?: string;
    githubId?: string;
  }) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password if provided
    const passwordHash = data.password ? await argon2.hash(data.password) : null;

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        googleId: data.googleId,
        githubId: data.githubId,
        isEmailVerified: !!data.googleId || !!data.githubId, // Auto-verify for OAuth
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        isEmailVerified: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByGoogleId(googleId: string) {
    return this.prisma.user.findUnique({
      where: { googleId },
    });
  }

  async findByGithubId(githubId: string) {
    return this.prisma.user.findUnique({
      where: { githubId },
    });
  }

  async update(id: string, data: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  }) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        isEmailVerified: true,
        createdAt: true,
      },
    });

    return user;
  }

  async updatePassword(id: string, newPassword: string) {
    const passwordHash = await argon2.hash(newPassword);

    await this.prisma.user.update({
      where: { id },
      data: { passwordHash },
    });
  }

  async updateLastLogin(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  }

  async verifyPassword(user: any, password: string): Promise<boolean> {
    if (!user.passwordHash) {
      return false;
    }
    return argon2.verify(user.passwordHash, password);
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
