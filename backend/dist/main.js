"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const winston_logger_1 = require("./common/logger/winston.logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new winston_logger_1.WinstonLogger(),
    });
    const configService = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: configService.get('CORS_ORIGIN') || 'http://localhost:3000',
        credentials: true,
    });
    app.use(compression());
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Project Nexus API')
        .setDescription('Multi-tenant SaaS platform for collaborative workspace management')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('auth', 'Authentication endpoints')
        .addTag('users', 'User management')
        .addTag('workspaces', 'Workspace management')
        .addTag('projects', 'Project management')
        .addTag('tasks', 'Task management')
        .addTag('calendar', 'Calendar and meetings')
        .addTag('reports', 'Reports and analytics')
        .addTag('integrations', 'Third-party integrations')
        .addTag('reviews', 'Review and feedback')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = configService.get('PORT') || 4000;
    await app.listen(port);
    console.log(`
    🚀 Application is running on: http://localhost:${port}
    📚 API Documentation: http://localhost:${port}/api/docs
    🔌 WebSocket: ws://localhost:${port}
  `);
}
bootstrap();
//# sourceMappingURL=main.js.map