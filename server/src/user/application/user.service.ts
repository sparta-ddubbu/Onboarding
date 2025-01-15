import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '../adapter/out/user.repository';
import { UserRepositoryPort } from './port/out/user.repository.port';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../adapter/dto/req/user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepositoryToken) private readonly userRepository: UserRepositoryPort) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userDto = { ...createUserDto, password: hashedPassword };
    return await this.userRepository.create(userDto);
  }

  async findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async findOneByNickname(nickname: string) {
    return this.userRepository.findOneByNickname(nickname);
  }
}
