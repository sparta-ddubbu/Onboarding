import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryPort } from '../../../user/application/port/out/user.repository.port';
import { UserEntity, UserDocument } from './user.schema';
import { UserMapper, UserMapperToken } from './user.mapper';

export const UserRepositoryToken = 'UserRepositoryToken';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>,
    @Inject(UserMapperToken) private readonly userMapper: UserMapper,
  ) {}

  async create(createUserDto: { nickname: string; password: string }) {
    const newUser = new this.userModel(createUserDto);
    const savedUser = await newUser.save();
    return this.userMapper.mapEntityToDomain(savedUser);
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    return this.userMapper.mapEntityToDomain(user);
  }

  async findOneByNickname(nickname: string) {
    const user = await this.userModel.findOne({ nickname });

    return this.userMapper.mapEntityToDomain(user);
  }

  async delete(userId: string) {
    await this.userModel.findByIdAndDelete(userId);
  }
}
