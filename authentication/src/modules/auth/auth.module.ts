import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import refreshTokenConfig from 'src/config/refresh-token.config';
import resetTokenConfig from 'src/config/reset-token.config';
import { AccountModule } from '../account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from 'src/entity/token';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    TypeOrmModule.forFeature([RefreshToken]),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshTokenConfig),
    ConfigModule.forFeature(resetTokenConfig),
    AccountModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
