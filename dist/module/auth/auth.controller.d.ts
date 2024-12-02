import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { UserLoginDto } from "./dto/userLogin.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<import("../user/users.schema").User>;
    login(loginUserDto: UserLoginDto): Promise<{
        access_token: string;
    }>;
}
