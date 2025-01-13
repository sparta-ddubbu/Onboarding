import { Controller, Post, Body, UnauthorizedException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  async create(@Body() createUserDto: { username: string; password: string }) {
    return this.userService.create(createUserDto);
  }

  @Post('sign-in')
  async login(@Body() loginDto: { nickname: string; password: string }, @Res() res: Response) {
    const user = await this.authService.validateUser(loginDto.nickname, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.authService.login(user);

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // TODO: 발급 유효기간과 통일 필요
    });

    return {
      accessToken: tokens.accessToken,
    };
  }
}
