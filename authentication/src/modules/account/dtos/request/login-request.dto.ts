import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
