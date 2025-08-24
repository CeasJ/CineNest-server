import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RoleDto } from 'src/modules/role/dto/role.dto';

export class CreateAccountRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;

  // role?: RoleDto;

  profileId: string;
}
