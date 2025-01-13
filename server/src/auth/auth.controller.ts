import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

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
  async login(@Body() loginDto: { nickname: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.nickname, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
