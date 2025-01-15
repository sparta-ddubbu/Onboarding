import { UserMapper, UserMapperToken } from './adapter/out/user.mapper';
import { UserRepository, UserRepositoryToken } from './adapter/out/user.repository';

export const UserRepositoryProvider = { provide: UserRepositoryToken, useClass: UserRepository };
export const UserMapperProvider = { provide: UserMapperToken, useClass: UserMapper };
