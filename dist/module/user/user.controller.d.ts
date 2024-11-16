import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers(): void;
    getUserByEmail(email: string): void;
    createTestUsers(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("../../model/users.schema").User> & import("../../model/users.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
