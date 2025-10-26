import { PrismaService } from '../../common/prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        googleId?: string;
        githubId?: string;
    }): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl: string;
        isEmailVerified: boolean;
        createdAt: Date;
    }>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl: string;
        isEmailVerified: boolean;
        isActive: boolean;
        createdAt: Date;
        lastLoginAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        googleId: string | null;
        githubId: string | null;
        passwordHash: string | null;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
        isEmailVerified: boolean;
        isActive: boolean;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
    }>;
    findByGoogleId(googleId: string): Promise<{
        id: string;
        email: string;
        googleId: string | null;
        githubId: string | null;
        passwordHash: string | null;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
        isEmailVerified: boolean;
        isActive: boolean;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
    }>;
    findByGithubId(githubId: string): Promise<{
        id: string;
        email: string;
        googleId: string | null;
        githubId: string | null;
        passwordHash: string | null;
        firstName: string;
        lastName: string;
        avatarUrl: string | null;
        isEmailVerified: boolean;
        isActive: boolean;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date | null;
    }>;
    update(id: string, data: {
        firstName?: string;
        lastName?: string;
        avatarUrl?: string;
    }): Promise<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        avatarUrl: string;
        isEmailVerified: boolean;
        createdAt: Date;
    }>;
    updatePassword(id: string, newPassword: string): Promise<void>;
    updateLastLogin(id: string): Promise<void>;
    verifyPassword(user: any, password: string): Promise<boolean>;
    delete(id: string): Promise<void>;
}
