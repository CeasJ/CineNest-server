import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
