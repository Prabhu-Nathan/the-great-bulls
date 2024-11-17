import { Model } from "mongoose";
import { CreateUserDto } from "src/module/user/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { EmailService } from "src/shared/common/email.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { User } from "../user/users.schema";
export declare class AuthService {
    private userModel;
    private jwtService;
    private emailService;
    constructor(userModel: Model<User>, jwtService: JwtService, emailService: EmailService);
    login(userLoginDto: UserLoginDto): Promise<{
        access_token: string;
    }>;
    validateUser(userLoginDto: UserLoginDto): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    findByVerificationToken(token: string): Promise<User | undefined>;
    verifyEmail(token: string): Promise<User>;
}
