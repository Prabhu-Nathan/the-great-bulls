import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserLoginDto } from './dto/user-login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<import("../../model/users.schema").User>;
    login(loginUserDto: UserLoginDto): Promise<{
        access_token: string;
    }>;
}
