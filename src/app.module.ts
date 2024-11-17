import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './module/auth/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './shared/common/email.service';
import { AuthModule } from './module/auth/auth.module';
import { AuthController } from './module/auth/auth.controller';
import { AuthService } from './module/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     const jwtSecret = configService.get<string>('JWT_SECRET');
    //     console.log("secrect: ", jwtSecret);
    //     if (!jwtSecret) {
    //       throw new Error('JWT_SECRET is not defined');
    //     }
    //     return {
    //       secret: jwtSecret,
    //       signOptions: { expiresIn: '3h' },
    //     };
    //   },
    // }),
    AuthModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    EmailService,
    AuthService,
    JwtService,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [AuthService,EmailService,JwtService],
})
export class AppModule {}
