import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { Role } from "./enum";
import { Roles } from "../auth/roles.decorator";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Roles(Role.ADMIN)
  @Get()
  public getAllUsers() {
    this.userService.findAllUsers();
  }

  @Get("/:email")
  @Roles(Role.ADMIN)
  public getUserByEmail(@Param("email") email: string) {
    this.userService.findUserByEmail(email);
  }

  @Post()
  public createTestUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createTestUser(createUserDto);
  }
}
