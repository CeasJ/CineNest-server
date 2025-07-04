import { Module } from '@nestjs/common';
import { Account } from 'src/entity/account';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [Account],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
