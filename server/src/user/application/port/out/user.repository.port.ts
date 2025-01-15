import { UserDomain } from 'src/user/domain/user.domain';

export interface UserRepositoryPort {
  create(createUserDto: { nickname: string; password: string }): Promise<UserDomain>;
  findOne(id: string): Promise<UserDomain | null>;
  findOneByNickname(nickname: string): Promise<UserDomain | null>;
  delete(id: string): Promise<void>;
}
