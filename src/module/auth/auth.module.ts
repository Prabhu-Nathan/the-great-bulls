import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "../user/user.module";
import { EmailService } from "src/shared/common/email.service";
import { UserService } from "../user/user.service";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./jwtAuth.guard";
import { RolesGuard } from "./roles.guard";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "3h" },
    }),
  ],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    JwtService,
    EmailService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
