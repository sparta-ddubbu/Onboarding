import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  getUserInfo() {
    const userId = 'todo';
    this.userService.findOne(userId);

    return { message: 'This is protected data' };
  }
}
