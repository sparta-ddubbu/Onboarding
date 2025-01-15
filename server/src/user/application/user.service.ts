import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '../adapter/out/user.repository';
import { UserRepositoryPort } from './port/out/user.repository.port';
import * as bcrypt from 'bcrypt';
import { CreateUserReqDto } from '../adapter/dto/req/user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepositoryToken) private readonly userRepository: UserRepositoryPort) {}
  async create(createUserDto: CreateUserReqDto) {
    const existingUser = await this.userRepository.findOneByNickname(createUserDto.nickname);

    if (existingUser) {
      throw new HttpException('닉네임 중복입니다', HttpStatus.BAD_REQUEST);
    }

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

  async deleteByUserId(userId: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new HttpException(`User with id ${userId} not found`, HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.delete(userId);
  }
}
