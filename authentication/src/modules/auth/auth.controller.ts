import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequestDto } from './dtos/request/register-request.dto';
import { RegisterResponse } from '../account/dtos/response/register-response.dto';
import { AuthService } from './auth.service';
import { LoginRequest } from './dtos/request/login-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: RegisterRequestDto): Promise<RegisterResponse> {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() req: LoginRequest) {
    return this.authService.login(req);
  }
}
