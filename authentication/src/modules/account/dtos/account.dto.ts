import { Exclude } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { UserStatus } from 'src/common/enum';
import { ProfileDto } from 'src/modules/profile/dtos/profile.dto';

export class AccountDto {
  id: string;

  email: string;

  phone: string;

  @Exclude()
  password: string;

  profile: ProfileDto;

  @IsEnum(UserStatus)
  active: UserStatus;
}
