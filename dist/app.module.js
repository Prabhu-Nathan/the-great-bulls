"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./module/user/user.module");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./module/auth/roles.guard");
const config_1 = require("@nestjs/config");
const email_service_1 = require("./shared/common/email.service");
const auth_module_1 = require("./module/auth/auth.module");
const auth_controller_1 = require("./module/auth/auth.controller");
const auth_service_1 = require("./module/auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('DB_URL'),
                }),
                inject: [config_1.ConfigService],
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1h' },
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            email_service_1.EmailService,
            auth_service_1.AuthService,
            jwt_1.JwtService,
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
        exports: [auth_service_1.AuthService, email_service_1.EmailService, jwt_1.JwtService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map