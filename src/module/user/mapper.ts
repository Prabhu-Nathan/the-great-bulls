import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./users.schema";

export class Mapper {
  static toUserResponse(user: User): any {
    return {
      id: user._id,
      name: user.username,
      email: user.email,
    };
  }

  static toUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
