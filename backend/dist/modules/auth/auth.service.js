"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const argon2 = require("argon2");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.passwordHash) {
            throw new common_1.UnauthorizedException('Please use OAuth to login');
        }
        const isPasswordValid = await argon2.verify(user.passwordHash, password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const { passwordHash: _, ...result } = user;
        return result;
    }
    async register(email, password, firstName, lastName) {
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new common_1.UnauthorizedException('Email already registered');
        }
        const hashedPassword = await argon2.hash(password);
        const user = await this.prisma.user.create({
            data: {
                email,
                passwordHash: hashedPassword,
                firstName,
                lastName,
            },
        });
        const { passwordHash: _, ...result } = user;
        return this.login(result);
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION', '15m'),
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', '7d'),
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });
        return {
            accessToken,
            refreshToken,
            user,
        };
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, firstName: true, lastName: true, avatarUrl: true, refreshToken: true },
        });
        if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        return this.login(user);
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
    }
    async validateOAuthUser(profile, provider) {
        let user = await this.prisma.user.findUnique({
            where: { email: profile.email },
        });
        if (!user) {
            const nameParts = profile.name ? profile.name.split(' ') : ['', ''];
            const firstName = nameParts[0] || 'User';
            const lastName = nameParts.slice(1).join(' ') || '';
            user = await this.prisma.user.create({
                data: {
                    email: profile.email,
                    firstName,
                    lastName,
                    avatarUrl: profile.avatar,
                    passwordHash: null,
                    ...(provider === 'google' ? { googleId: profile.googleId } : {}),
                    ...(provider === 'github' ? { githubId: profile.githubId } : {}),
                },
            });
        }
        const { passwordHash: _, ...result } = user;
        return this.login(result);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map