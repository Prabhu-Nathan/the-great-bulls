import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAllUsers(): void;
    getUserByEmail(email: string): void;
    createTestUsers(createUserDto: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./users.schema").User> & import("./users.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
