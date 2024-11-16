import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Role } from './enum';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  public getAllUsers() {
    this.userService.findAllUsers();
  }

  @Get('/:email')
  @Roles(Role.ADMIN)
  public getUserByEmail(@Param('email') email: string) {
    this.userService.findUserByEmail(email);
  }

  @Post()
  public createTestUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createTestUser(createUserDto);
  }
}
