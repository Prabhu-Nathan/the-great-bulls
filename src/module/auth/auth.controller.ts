import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { UserLoginDto } from "./dto/userLogin.dto";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post("register")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Public()
  @Post("login")
  async login(@Body() loginUserDto: UserLoginDto) {
    return this.authService.login(loginUserDto);
  }
}
