import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: { username: string; password: string }): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}
