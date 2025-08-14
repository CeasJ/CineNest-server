import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequest } from './dtos/request/login-request.dto';
import { AccountDto } from '../account/dtos/account.dto';
import { RegisterRequestDto } from './dtos/request/register-request.dto';
import { transformToDTO } from 'src/common/transform.ultil';
import refreshTokenConfig from 'src/config/refresh-token.config';
import { ConfigType } from '@nestjs/config';
import resetTokenConfig from 'src/config/reset-token.config';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { compare } from 'bcrypt';
import { ProfileService } from '../profile/profile.service';
import { hash } from 'src/helper/security';
import { RegisterResponse } from '../account/dtos/response/register-response.dto';
import { LoginResponseDto } from './dtos/response/login-response.dto';
import { IToken } from './dtos/token.interface';
import { JwtPayload } from 'src/helper/jwt.payload';
import { Repository } from 'typeorm';
import { RefreshToken } from 'src/entity/token';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    @Inject(refreshTokenConfig.KEY)
    private readonly refreshTknConfig: ConfigType<typeof refreshTokenConfig>,
    @Inject(resetTokenConfig.KEY)
    private readonly resetTknConfig: ConfigType<typeof resetTokenConfig>,
    private readonly jwtService: JwtService,

    @InjectRepository(RefreshToken)
    private readonly tokenRepo: Repository<RefreshToken>,
  ) {}

  async generateTokens(userId: string, email: string): Promise<IToken> {
    const payload: JwtPayload = { sub: userId, email: email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.jwtService.sign(payload, this.refreshTknConfig),
    ]);
    return { accessToken, refreshToken };
  }

  async login(data: LoginRequest): Promise<LoginResponseDto> {
    const findExist = await this.accountService.findByUsernameOrEmail(
      data.username,
    );
    if (!findExist) {
      throw new NotFoundException('Account not found');
    }
    const hashPassword = await hash(data.password);
    const isPasswordMatch = compare(findExist.password, hashPassword);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const account = await this.accountService.findByUsernameOrEmail(
      data.username,
    );

    const { accessToken, refreshToken } = await this.generateTokens(
      account.id,
      account.email,
    );

    await this.tokenRepo.save({ token: refreshToken, account: account });

    return {
      id: account.id,
      email: account.email,
      token: { accessToken, refreshToken },
    };
  }

  async register(data: RegisterRequestDto): Promise<RegisterResponse> {
    const findExist = await this.accountService.findByUsernameOrEmail(
      data.phone || data.email,
    );
    if (findExist) {
      throw new ConflictException('User already exist');
    }

    const hashPassword = await hash(data.password);

    const account = await this.accountService.create({
      email: data.email,
      phone: data.phone,
      password: hashPassword,
    });

    return { account };
  }

  async logout(refreshToken: string) {
    return this.tokenRepo.delete({ token: refreshToken });
  }
}
