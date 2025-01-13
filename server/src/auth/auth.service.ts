import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

type TokenPayload = { id: string; nickname: string };
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
      return { id: user._id.toString(), nickname: user.nickname };
    }
    return null;
  }

  login(user: TokenPayload): TokenSet {
    const payload = { nickname: user.nickname, id: user.id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}
