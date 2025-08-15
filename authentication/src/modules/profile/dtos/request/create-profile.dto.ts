import { AccountDto } from 'src/modules/account/dtos/account.dto';

export class CreateProfileRequestDto {
  firstName: string;

  lastName: string;

  address: string;

  gender: number;

  account: AccountDto;
}
