export interface IToken {
  accessToken: string;
  refreshToken?: string;
  expireAt?: string;
  permission?: string[];
}
