import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./module/user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailService } from "./shared/common/email.service";
import { AuthModule } from "./module/auth/auth.module";
import { AuthController } from "./module/auth/auth.controller";
import { AuthService } from "./module/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { ContactRequestModule } from "./module/contact-request/contact-request.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    AuthModule,
    UserModule,
    ContactRequestModule,
  ],
  controllers: [AuthController],
  providers: [EmailService, AuthService, JwtService],
  exports: [AuthService, EmailService, JwtService],
})
export class AppModule {}
