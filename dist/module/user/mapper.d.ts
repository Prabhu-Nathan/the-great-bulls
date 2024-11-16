import { User } from 'src/model/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
export declare class Mapper {
    static toUserResponse(user: User): any;
    static toUser(createUserDto: CreateUserDto): CreateUserDto;
}
