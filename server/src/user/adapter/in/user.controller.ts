import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/guard';
import { UserService } from 'src/user/application/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  async getUserInfo(@Request() req) {
    const userId = req.user.id;
    const user = await this.userService.findOne(userId);
    if (user) {
      return { userId, nickname: user.nickname };
    } else {
      return {}; // TODO: error
    }
  }
}
