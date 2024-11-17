import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./users.schema";
export declare class Mapper {
    static toUserResponse(user: User): any;
    static toUser(createUserDto: CreateUserDto): CreateUserDto;
}
