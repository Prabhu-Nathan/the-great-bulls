import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "src/module/user/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { randomBytes } from "crypto";
import { EmailService } from "src/shared/common/email.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { User } from "../user/users.schema";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private userModel: Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async login(userLoginDto: UserLoginDto) {
    const user = await this.validateUser(userLoginDto);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is missing when signing the token!");
    }

    return {
      access_token: await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<User> {
    const user = await this.userModel.findOne({ email: userLoginDto.email });
    if (user && (await bcrypt.compare(userLoginDto.password, user.password))) {
      return user;
    }
    return null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException("User with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const verificationToken = randomBytes(5).toString("hex").slice(0, length);

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      verificationToken: verificationToken,
    });

    this.emailService.sendVerificationEmail(newUser.email, verificationToken);
    return newUser.save();
  }

  async findByVerificationToken(token: string): Promise<User | undefined> {
    return this.userModel.findOne({ verificationToken: token });
  }

  async verifyEmail(token: string) {
    const user = await this.findByVerificationToken(token);
    if (!user) {
      throw new Error("Invalid verification token");
    }
    user.isVerified = true;
    user.verificationToken = null;
    return await user.save();
  }
}
