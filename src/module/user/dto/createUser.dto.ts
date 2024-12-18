import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  MinLength,
  Matches,
  MaxLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "john", required: true })
  @IsString()
  @MinLength(3, { message: "Username must be at least 3 characters long" })
  @MaxLength(16, { message: "Username cannot exceed 16 characters" })
  username: string;

  @ApiProperty({ example: "john@gmail.com", required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "secrect", required: true })
  @IsString()
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/(?=.*[0-9])(?=.*[^A-Za-z0-9])/, {
    message:
      "Password must contain at least one special character and one number",
  })
  password: string;
}
