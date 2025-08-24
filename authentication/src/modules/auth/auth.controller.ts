import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { RegisterRequestDto } from './dtos/request/register-request.dto';
import { RegisterResponse } from '../account/dtos/response/register-response.dto';
import { AuthService } from './auth.service';
import { LoginRequest } from './dtos/request/login-request.dto';
import { TransactionInterceptor } from 'src/common/transaction.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(TransactionInterceptor)
  register(@Body() data: RegisterRequestDto): Promise<RegisterResponse> {
    return this.authService.register(data);
  }

  @Post('verifyOTP')
  verifyOtp(@Body() id: string, code: number) {
    return this.authService.verifyOTP(code, id);
  }

  @Post('resend-otp')
  resendOtp(@Body() id: string) {
    return this.authService.resendOtp(id);
  }

  @Post('login')
  login(@Body() req: LoginRequest) {
    return this.authService.login(req);
  }
}
