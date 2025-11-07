import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport-github2';
declare const GithubStrategy_base: new (...args: any[]) => any;
export declare class GithubStrategy extends GithubStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: Profile, done: Function): Promise<any>;
}
export {};
