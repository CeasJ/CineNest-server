import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresOptions } from 'src/config/data-source';

@Module({
  imports: [TypeOrmModule.forRoot(postgresOptions)],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
