import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../common/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<any>;
    register(email: string, password: string, firstName: string, lastName: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    login(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    logout(userId: string): Promise<void>;
    validateOAuthUser(profile: any, provider: 'google' | 'github'): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
}
