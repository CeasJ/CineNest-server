import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequest } from './dtos/request/login-request.dto';
import { RegisterRequestDto } from './dtos/request/register-request.dto';
import refreshTokenConfig from 'src/config/refresh-token.config';
import { ConfigType } from '@nestjs/config';
import resetTokenConfig from 'src/config/reset-token.config';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { compare } from 'bcrypt';
import { hash } from 'src/helper/security';
import { RegisterResponse } from '../account/dtos/response/register-response.dto';
import { LoginResponseDto } from './dtos/response/login-response.dto';
import { IToken } from './dtos/token.interface';
import { JwtPayload } from 'src/helper/jwt.payload';
import { Repository } from 'typeorm';
import { RefreshToken } from 'src/entity/token';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from 'src/common/enum';
import { ProfileService } from '../profile/profile.service';
import { randomCode } from '../../helper/random-string';
import { AuthenticationCode } from 'src/entity/authentication-code';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    @Inject(refreshTokenConfig.KEY)
    private readonly refreshTknConfig: ConfigType<typeof refreshTokenConfig>,
    @Inject(resetTokenConfig.KEY)
    private readonly resetTknConfig: ConfigType<typeof resetTokenConfig>,
    private readonly jwtService: JwtService,
    private readonly profileService: ProfileService,
    @InjectRepository(RefreshToken)
    private readonly tokenRepo: Repository<RefreshToken>,
    @InjectRepository(AuthenticationCode)
    private readonly authenRepo: Repository<AuthenticationCode>,
  ) {}

  async generateTokens(userId: string, email: string): Promise<IToken> {
    const payload: JwtPayload = { sub: userId, email: email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload),
      this.jwtService.sign(payload, this.refreshTknConfig),
    ]);
    return { accessToken, refreshToken };
  }

  async generateAuthenCode(id: string) {
    const authCode = randomCode();
    const account = await this.accountService.findEntityById(id);
    return this.authenRepo.save({
      code: authCode,
      accountId: id,
      account: account,
      expiredTime: (Date.now() + 60 * 5).toString(),
      isUsed: false,
    });
  }

  // OTP verification for active the account
  async verifyOTP(authenCode: number, accountId: string) {
    const find = await this.authenRepo.findOne({
      where: {
        accountId: accountId,
      },
    });
    if (!find) throw new NotFoundException('Account not found');
    if (Date.parse(find.expiredTime) < Date.now())
      throw new UnauthorizedException('Expired code');
    const isTrue = await compare(authenCode, find.code);
    if (!isTrue) throw new ConflictException('Confirm code does not match');
    await this.authenRepo.update(find.id, { isUsed: true });
  }

  async login(data: LoginRequest): Promise<LoginResponseDto> {
    const account = await this.accountService.findByPhoneOrEmail(data.username);
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const entity = await this.accountService.findEntityById(account.id);

    if (account.active !== UserStatus.ACTIVE) {
      throw new UnauthorizedException("Account hasn't activated yet!");
    }
    const hashPassword = await hash(data.password);
    const isPasswordMatch = compare(entity.password, hashPassword);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      account.id,
      account.email,
    );

    await this.tokenRepo.save({ token: refreshToken, account: entity });

    return {
      id: account.id,
      email: account.email,
      token: { accessToken, refreshToken },
    };
  }

  // Register an account and send the OTP code into its mail
  async register(data: RegisterRequestDto): Promise<RegisterResponse> {
    const profile = await this.profileService.create({
      firstName: data.firstname,
      lastName: data.lastname,
      address: data.address,
      gender: data.gender,
    });
    const account = await this.accountService.create({
      email: data.email,
      phone: data.phone,
      password: data.password,
      profileId: profile.id,
    });

    // Generate the authen code for account activation
    const otp = await this.generateAuthenCode(account.id);

    return {
      email: account.email,
      phone: account.phone,
      code: otp.code,
      // For API testing - Remove later
    };
  }

  // Resend the code if the user cannot get the it (like accidently refresh the page)
  async resendOtp(
    username: string,
  ): Promise<{ email?: string; phone?: string; code: number }> {
    const account = await this.accountService.findByPhoneOrEmail(username);
    if (!account) throw new NotFoundException('Cannot find user');

    const otp = await this.generateAuthenCode(account.id);

    return {
      email: account.email,
      phone: account.phone,
      code: otp.code,
    };
  }

  async logout(refreshToken: string) {
    return this.tokenRepo.delete({ token: refreshToken });
  }
}
