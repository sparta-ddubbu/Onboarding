import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt/guard';
import { UserService } from '../../../user/application/user.service';
import { mapDomainToUserInfoDto } from './user.mapper';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user information' })
  @ApiResponse({ status: 200 })
  async getUserInfo(@Request() req) {
    const userId = req.user.id;
    const user = await this.userService.findOne(userId);
    return mapDomainToUserInfoDto(user);
  }
}
