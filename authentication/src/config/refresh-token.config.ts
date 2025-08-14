import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
require('dotenv').config();

export default registerAs(
  'refresh-jwt',
  (): JwtSignOptions => ({
    secret: process.env.REFRESH_TOKEN_SECRET || 'thisissecrettoken',
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  }),
);
