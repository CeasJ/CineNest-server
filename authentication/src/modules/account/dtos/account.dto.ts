import { Exclude, Expose, Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { UserStatus } from 'src/common/enum';
import { RefreshToken } from 'src/entity/token';
import { ProfileDto } from 'src/modules/profile/dtos/profile.dto';
import { RoleDto } from 'src/modules/role/dto/role.dto';

@Exclude()
export class AccountDto {
  @Expose()
  id: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  active: UserStatus;

  @Expose()
  roleId?: string;

  @Expose()
  profileId?: string;

  @Expose()
  @Type(() => RoleDto)
  role?: RoleDto;

  @Expose()
  @Type(() => ProfileDto)
  profile?: ProfileDto;

  @Expose()
  @Type(() => RefreshToken)
  refreshTokens?: RefreshToken[];
}
