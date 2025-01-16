import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from './jwt/jwt.strategy';
import { UserService } from '../user/application/user.service';
import { BusinessException } from 'src/exception/BusinessException';

type TokenSet = { accessToken: string; refreshToken: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(nickname: string, password: string): Promise<TokenPayload | null> {
    const user = await this.userService.findOneByNickname(nickname);

    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user.id, nickname: user.nickname };
    }

    throw new BusinessException('auth', 'LOGIN_FAILED', '로그인에 실패했습니다', HttpStatus.BAD_REQUEST);
  }

  generateTokens(data: TokenPayload): TokenSet {
    const payload = { nickname: data.nickname, id: data.id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}
