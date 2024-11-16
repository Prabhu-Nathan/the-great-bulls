"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt.strategy");
const user_module_1 = require("../user/user.module");
const email_service_1 = require("../../shared/common/email.service");
const user_service_1 = require("../user/user.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            user_module_1.UserModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule, user_module_1.UserModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => {
                    const jwtSecret = configService.get('JWT_SECRET');
                    const dbUrl = configService.get('DB_URL');
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
        providers: [user_service_1.UserService, auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, email_service_1.EmailService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map