import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryPort } from 'src/user/application/port/out/user.repository.port';
import { User, UserDocument } from './user.schema';

export const UserRepositoryToken = 'UserRepositoryToken';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: { username: string; password: string }): Promise<void> {
    const newUser = new this.userModel(createUserDto);
    await newUser.save();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findOneByNickname(nickname: string): Promise<User | null> {
    return this.userModel.findOne({ nickname }).exec();
  }
}
