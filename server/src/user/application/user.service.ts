import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserRepositoryToken } from '../adapter/out/user.repository';
import { UserRepositoryPort } from './port/out/user.repository.port';
import * as bcrypt from 'bcrypt';
import { CreateUserReqDto } from '../adapter/dto/req/user.dto';
import { BusinessException } from '../../exception/BusinessException';
import { ErrorCode } from '../../exception/error-code';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepositoryToken) private readonly userRepository: UserRepositoryPort) {}
  async create(createUserDto: CreateUserReqDto) {
    const existingUser = await this.userRepository.findOneByNickname(createUserDto.nickname);

    if (existingUser) {
      throw new BusinessException(
        ErrorCode.USER_DUP_NICKNAME,
        '닉네임 중복입니다',
        '닉네임 중복입니다',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userDto = { ...createUserDto, password: hashedPassword };
    return await this.userRepository.create(userDto);
  }

  async findOne(id: string) {
    const user = this.userRepository.findOne(id);

    if (!user) {
      throw new BusinessException(ErrorCode.NOT_FOUND_USER, '', '존재하지 않는 유저입니다', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findOneByNickname(nickname: string) {
    return this.userRepository.findOneByNickname(nickname);
  }

  async deleteByUserId(userId: string): Promise<void> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new BusinessException(ErrorCode.NOT_FOUND_USER, '', '존재하지 않는 유저입니다', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.delete(userId);
  }
}
