import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class UserLoginDto {
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
