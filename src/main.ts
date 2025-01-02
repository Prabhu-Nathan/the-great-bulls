import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

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
  // requiredEnvVars: This is an array of required environment variables needed for the app to run (such as JWT secret, database URL, and email account credentials).
  // forEach loop: It checks whether each required environment variable is available in the process.env. 
  // If any variable is missing, it logs the missing variable and then stops the execution of the application (process.exit(1)).

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setVersion("1.0")
    .addServer("http://localhost:3000/", "Local environment")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(process.env.PORT ?? 3000);
  // This line starts the application and tells it to listen for incoming HTTP requests. It listens on the port specified in the PORT environment variable or defaults to port 3000 if not provided (?? is the nullish coalescing operator).

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  // app.useGlobalPipes: This sets up global pipes for all incoming requests.
  // ValidationPipe: This pipe validates the incoming request's body based on defined validation rules and decorators (like @IsString, @IsNotEmpty).
  // Options:
  // transform: true: Automatically transforms payloads to DTO (Data Transfer Object) types.
  // whitelist: true: Strips any properties that are not explicitly defined in the DTO.
  // forbidNonWhitelisted: true: Throws an error if any property in the incoming request is not part of the DTO.

}

bootstrap();
// This line actually runs the bootstrap() function to initialize the application.
