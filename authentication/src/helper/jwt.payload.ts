export interface JwtPayload {
  sub: string;
  email: string;
  code?: string;
}
