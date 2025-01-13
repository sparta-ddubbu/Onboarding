import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // 유저 검증 예제 (실제 DB와 연동 필요)
  async validateUser(nickname: string, password: string): Promise<any> {
    const user = { id: 1, nickname: 'test', password: await bcrypt.hash('password', 10) }; // 임시 데이터
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // JWT 토큰 발급
  async login(user: any) {
    const payload = { nickname: user.nickname, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
