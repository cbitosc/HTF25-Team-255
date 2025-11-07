import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(id: string): Promise<{
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
    update(id: string, updateData: {
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
}
