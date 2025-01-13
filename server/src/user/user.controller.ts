import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('info')
  getUserInfo() {
    return { message: 'This is protected data' };
  }
}
