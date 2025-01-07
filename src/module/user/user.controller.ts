import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { Role } from "./enum";
import { Roles } from "../auth/roles.decorator";
import { CreateUserDto } from "./dto/createUser.dto";
import { JwtAuthGuard } from "../auth/jwtAuth.guard";
import { RolesGuard } from "../auth/roles.guard";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) { }

  @Roles(Role.ADMIN)
  @Get()
  public getAllUsers(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.userService.findAllUsers(pageNumber, limitNumber);
  }

  @Get("/:email")
  @Roles(Role.ADMIN)
  public getUserByEmail(@Param("email") email: string) {
    return this.userService.findUserByEmail(email);
  }

  // only for test user create
  @Post()
  public createTestUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createTestUser(createUserDto);
  }
}
