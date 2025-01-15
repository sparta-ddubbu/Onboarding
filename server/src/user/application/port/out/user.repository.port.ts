import { User } from 'src/user/adapter/out/user.schema';

export interface UserRepositoryPort {
  create(createUserDto: { username: string; password: string }): Promise<void>;
  findOne(id: string): Promise<User | null>;
  findOneByNickname(nickname: string): Promise<User | null>;
}
