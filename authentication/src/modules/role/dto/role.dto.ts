import { UserRole } from 'src/common/enum';
import { AccountDto } from 'src/modules/account/dtos/account.dto';

export class RoleDto {
  name: UserRole;

  account: AccountDto;
}
