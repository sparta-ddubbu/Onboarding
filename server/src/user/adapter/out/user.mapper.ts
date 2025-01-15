import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.schema';
import { UserDomain } from '../../domain/user.domain';

export const UserMapperToken = 'UserMapperToken';

@Injectable()
export class UserMapper {
  mapEntityToDomain(user: UserEntity) {
    return user ? new UserDomain({ id: user._id.toString(), nickname: user.nickname, password: user.password }) : null;
  }
}
