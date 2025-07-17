import { AccountDto } from '../../account/dtos/account.dto';
export class ProfileDto {
  id: string;

  lastName: string;

  address: string;

  gender: number;

  account: AccountDto;
}
