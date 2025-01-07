import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Mapper } from "./mapper";
import { CreateUserDto } from "./dto/createUser.dto";
import * as bcrypt from "bcrypt";
import { User } from "./users.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private readonly userModel: Model<User>) { }

  async findAllUsers(page: number = 1, limit: number = 10) {
    console.log('page : ', page, "limit : ", limit);

    // return (await this.userModel.find()).map(Mapper.toUserResponse);
    const totalUser = await this.userModel.countDocuments();
    const totalPage = Math.ceil(totalUser / limit);

    const user = await this.userModel.find().skip((page - 1) * limit).limit(limit).exec();

    return {
      currentPage: page,
      totalPage,
      totalUser,
      perPage: limit,
      user: user.map(Mapper.toUserResponse)

    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async createTestUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
      isVerified: true,
      verificationToken: null,
    });
    return user.save();
  }
}
