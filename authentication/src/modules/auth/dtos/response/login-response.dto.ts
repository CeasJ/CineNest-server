import { IToken } from '../token.interface';

export class LoginResponseDto {
  id: string;
  email: string;
  token: IToken;
}
