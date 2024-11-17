import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findAllUsers(): Promise<any[]>;
    findUserByEmail(email: string): Promise<User | null>;
    createTestUser(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
