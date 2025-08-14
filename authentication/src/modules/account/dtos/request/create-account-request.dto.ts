import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Profile } from '../../../../entity/profile';

export class CreateAccountRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  // @IsNotEmpty()
  // profile: Profile;

  @IsString()
  roleId?: string;
}
