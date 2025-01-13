import { Controller, Post, Body, UnauthorizedException, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

const REFRESH_TOKEN_KEY = 'refreshToken';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  async create(@Body() createUserDto: { username: string; password: string }) {
    return this.userService.create(createUserDto);
  }

  @Post('sign-in')
  async login(@Body() loginDto: { nickname: string; password: string }, @Res() res: Response) {
    const payload = await this.authService.validateUser(loginDto.nickname, loginDto.password);
    if (!payload) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.authService.generateTokens(payload);

    res.cookie(REFRESH_TOKEN_KEY, tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // TODO: 발급 유효기간과 통일 필요
    });

    return {
      accessToken: tokens.accessToken,
    };
  }

  @Post('refresh-token') // TODO: 작업
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload = this.jwtService.verify(refreshToken);

      const tokens = this.authService.generateTokens(payload);

      res.cookie(REFRESH_TOKEN_KEY, tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // TODO: 발급 유효기간과 통일 필요
      });

      return {
        accessToken: tokens.accessToken,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
