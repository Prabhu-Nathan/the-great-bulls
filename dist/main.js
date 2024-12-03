"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const requiredEnvVars = [
        "JWT_SECRET",
        "DB_URL",
        "EMAIL_ACCOUNT",
        "EMAIL_PASSWORD",
    ];
    requiredEnvVars.forEach((key) => {
        if (!process.env[key]) {
            console.log(`Missing environment variable: ${key}`);
            process.exit(1);
        }
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:3000', 'http://localhost:3001'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
}
bootstrap();
//# sourceMappingURL=main.js.map