import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountDto } from './dtos/account.dto';
import { CreateAccountRequest } from './dtos/request/create-account-request.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() req: CreateAccountRequest): Promise<AccountDto> {
    return this.accountService.create(req);
  }

  @Get('/:username')
  findByUsername(@Param('username') username: string) {
    return this.accountService.findByUsernameOrEmail(username);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.accountService.findById(id);
  }

}
