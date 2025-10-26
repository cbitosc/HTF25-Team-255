export declare class AppController {
    getRoot(): {
        name: string;
        version: string;
        status: string;
        endpoints: {
            health: string;
            docs: string;
            auth: string;
            users: string;
        };
        message: string;
    };
}
