import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Profile } from 'src/entity';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Profile])],
  providers: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
