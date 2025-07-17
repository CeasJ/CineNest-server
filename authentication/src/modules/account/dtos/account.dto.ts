import { Exclude } from 'class-transformer';
import { ProfileDto } from 'src/modules/profile/dtos/profile.dto';

export class AccountDto {
  id: string;

  email: string;

  phone: string;

  @Exclude()
  password: string;

  profile: ProfileDto;
}
