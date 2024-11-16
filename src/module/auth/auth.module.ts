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
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, UserModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.get<string>('JWT_SECRET');
        const dbUrl = configService.get<string>('DB_URL');
        console.log('DB_URL:', dbUrl);
        console.log('JWT_SECRET:', jwtSecret);
        if (!jwtSecret) {
          throw new Error('JWT_SECRET is not defined');
        }
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: '3h' },
        };
      },
    }),
  ],

  providers: [UserService, AuthService, JwtStrategy, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}
