import { Body, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entity/account';
import { Repository } from 'typeorm';
import { CreateAccountRequest } from './dtos/request/create-account.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Profile } from 'src/entity';
import { RegisterResponse } from './dtos/response/register-response.dto';
import { AccountDto } from './dtos/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
    @InjectRepository(Profile)
    private profileRepo: Repository<Profile>,
  ) {}

  async create(@Body() data: CreateAccountRequest): Promise<AccountDto> {
    const save = await this.accountRepo.save(data);
    return plainToInstance(AccountDto, save);
  }

  async findAll(): Promise<AccountDto[]> {
    const result = await this.accountRepo.find();
    return plainToInstance(AccountDto, result);
  }
}
