import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

type UserTokenParams = { id: string; nickname: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(nickname: string, password: string): Promise<UserTokenParams | null> {
    const user = await this.userService.findOneByNickname(nickname);
    if (user && (await bcrypt.compare(password, user.password))) {
      return { id: user._id.toString(), nickname: user.nickname };
    }
    return null;
  }

  async login(user: UserTokenParams) {
    const payload = { nickname: user.nickname, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
