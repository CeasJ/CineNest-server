import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entity/account';
import { DeepPartial, Repository } from 'typeorm';
import { AccountDto } from './dtos/account.dto';
import { CreateAccountRequest } from './dtos/request/create-account-request.dto';
import { transformToDTO } from 'src/common/transform.ultil';
import { UserStatus } from 'src/common/enum';
import { ChangePasswordRequest } from './dtos/request/change-password-request.dto';
import { ProfileService } from '../profile/profile.service';
import { compare } from 'bcrypt';
import { hash } from 'src/helper/security';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private readonly profileService: ProfileService,
  ) {}

  // Find account by Account Id
  async findById(id: string): Promise<AccountDto> {
    const account = await this.accountRepo.findOne({
      where: { id },
      relations: ['role', 'profile', 'refreshTokens'],
    });

    return transformToDTO(AccountDto, account);
  }

  async findEntityById(id: string): Promise<Account> {
    return this.accountRepo.findOne({ where: { id } });
  }

  // Find Account by phone or Email
  async findByPhoneOrEmail(username: string): Promise<AccountDto | null> {
    const where: any[] = [];

    if (username.includes('@')) {
      where.push({ email: username });
    } else {
      where.push({ phone: username });
    }

    const account = await this.accountRepo.findOne({
      where,
      relations: ['role', 'profile'],
    });

    return account ? transformToDTO(AccountDto, account) : null;
  }

  // Save account into database
  async create(data: CreateAccountRequest): Promise<AccountDto> {
    if (await this.findByPhoneOrEmail(data.phone || data.email)) {
      throw new ConflictException('This personal information already exists');
    }
    const hashPassword = await hash(data.password);

    const saved = await this.accountRepo.save({
      ...data,
      password: hashPassword,
    });

    return transformToDTO(AccountDto, saved);
  }

  async update(id: string, data: DeepPartial<Account>): Promise<AccountDto> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('Cannot find account');
    }

    const hashPassword = await hash(data.password);
    const saved = await this.accountRepo.update(id, {
      ...data,
      password: hashPassword,
    });

    return transformToDTO(AccountDto, saved);
  }

  // Soft delete
  async delete(id: string) {
    const account = await this.findById(id);
    if (!account) throw new NotFoundException('Account not found');
    return await this.accountRepo.softDelete(id);
  }

  // User changes the password
  async changePassword(
    id: string,
    data: ChangePasswordRequest,
  ): Promise<AccountDto> {
    const account = await this.accountRepo.findOne({ where: { id } });
    if (!account) throw new NotFoundException('Account not found');
    if (!(await compare(data.currentPassword, account.password)))
      throw new BadRequestException('Old password not match');
    const hashPassword = await hash(data.newPassword);
    return await this.update(id, { password: hashPassword });
  }

  async resetPassword(id: string) {
    const account = await this.findById(id);
    if (!account) throw new NotFoundException('Account not found!');
  }
}
