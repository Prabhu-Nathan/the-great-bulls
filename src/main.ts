import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

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

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
}
bootstrap();
