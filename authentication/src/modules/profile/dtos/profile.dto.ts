import { AccountDto } from '../../account/dtos/account.dto';
export class ProfileDto {
  id: string;

  firstName: string;

  lastName: string;

  address: string;

  gender: number;

  accountId?: string;
}
