import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty()
  @IsNumber()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  gender: number;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
