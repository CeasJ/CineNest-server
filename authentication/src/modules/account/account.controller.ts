import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateAccountRequest } from './dtos/request/create-account.dto';
import { AccountService } from './account.service';
import { AccountDto } from './dtos/account.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  create(@Body() req: CreateAccountRequest): Promise<AccountDto> {
    return this.accountService.create(req);
  }

  @Get()
  getAllAccount(): Promise<AccountDto[]> {
    return this.accountService.findAll();
  }
}
