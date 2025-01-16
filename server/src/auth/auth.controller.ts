import { Controller, Post, Body, UnauthorizedException, Res, Req, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/application/user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserReqDto, createUserReqDtoSchema } from '../user/adapter/dto/req/user.dto';
import { SignInReqDto } from './auth.controller.dto';
import { RequestBodyValidator } from '../utils/validation/validator.util';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  @UsePipes(new RequestBodyValidator(createUserReqDtoSchema))
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createUserDto: CreateUserReqDto) {
    const user = await this.userService.create(createUserDto);

    return { userId: user.id, nickname: user.nickname }; // TODO: Response validation
  }

  @Post('sign-in')
  @ApiOperation({ summary: 'Login to get JWT tokens' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: SignInReqDto, @Res() res: Response) {
    const payload = await this.authService.validateUser(loginDto.nickname, loginDto.password);

    const tokens = this.authService.generateTokens(payload);

    res.cookie(ACCESS_TOKEN_KEY, tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    });

    res.cookie(REFRESH_TOKEN_KEY, tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({});
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout and clear cookies' })
  @ApiResponse({ status: 200, description: 'User successfully logged out' })
  async logout(@Res() res: Response) {
    res.clearCookie(ACCESS_TOKEN_KEY, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.clearCookie(REFRESH_TOKEN_KEY, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.json({});
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh access token using refresh token' }) // POST /auth/refresh-token
  @ApiResponse({ status: 200, description: 'Tokens successfully refreshed' })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload = this.jwtService.verify(refreshToken);

      const tokens = this.authService.generateTokens(payload);

      res.cookie(ACCESS_TOKEN_KEY, tokens.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000,
      });

      res.cookie(REFRESH_TOKEN_KEY, tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.send({});
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
