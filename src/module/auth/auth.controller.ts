import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/createUser.dto";
import { UserLoginDto } from "./dto/userLogin.dto";
import { Public } from "./public.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags("Register")
  @Public()
  @Post("register")
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @ApiTags("Login")
  @Public()
  @Post("login")
  async login(@Body() loginUserDto: UserLoginDto) {
    return this.authService.login(loginUserDto);
  }
}
