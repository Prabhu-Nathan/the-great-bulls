import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mapper } from './mapper';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // For password hashing
import { User } from './users.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAllUsers() {
    return (await this.userModel.find().exec()).map(Mapper.toUserResponse);
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
