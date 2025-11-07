import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(email: string, password: string, firstName: string, lastName: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    refresh(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
    googleAuth(): Promise<void>;
    googleAuthCallback(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    githubAuth(): Promise<void>;
    githubAuthCallback(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: any;
    }>;
    getProfile(req: any): Promise<any>;
}
