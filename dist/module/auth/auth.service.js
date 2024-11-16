"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("crypto");
const email_service_1 = require("../../shared/common/email.service");
let AuthService = class AuthService {
    constructor(userModel, jwtService, emailService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async login(userLoginDto) {
        const user = await this.validateUser(userLoginDto);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            username: user.username,
            id: user._id,
            email: user.email,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async validateUser(userLoginDto) {
        const user = await this.userModel.findOne({ email: userLoginDto.email });
        if (user && (await bcrypt.compare(userLoginDto.password, user.password))) {
            return user;
        }
        return null;
    }
    async createUser(createUserDto) {
        const existingUser = await this.userModel.findOne({
            email: createUserDto.email,
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists.');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const verificationToken = (0, crypto_1.randomBytes)(5).toString('hex').slice(0, length);
        const newUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
            verificationToken: verificationToken,
        });
        this.emailService.sendVerificationEmail(newUser.email, verificationToken);
        return newUser.save();
    }
    async findByVerificationToken(token) {
        return this.userModel.findOne({ verificationToken: token });
    }
    async verifyEmail(token) {
        const user = await this.findByVerificationToken(token);
        if (!user) {
            throw new Error('Invalid verification token');
        }
        user.isVerified = true;
        user.verificationToken = null;
        return await user.save();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map