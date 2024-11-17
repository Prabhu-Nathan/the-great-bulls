import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { EmailService } from 'src/shared/common/email.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [UserModule],
  providers: [UserService, AuthService, JwtService, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}
