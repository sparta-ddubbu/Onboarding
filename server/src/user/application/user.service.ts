import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '../adapter/out/user.repository';
import { UserRepositoryPort } from './port/out/user.repository.port';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepositoryToken) private readonly userRepository: UserRepositoryPort) {}
  async create(createUserDto: { username: string; password: string }) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userDto = { ...createUserDto, password: hashedPassword };
    await this.userRepository.create(userDto);
    return {};
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async findOneByNickname(nickname: string) {
    return this.userRepository.findOneByNickname(nickname);
  }
}
