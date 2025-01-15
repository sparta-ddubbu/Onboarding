import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { UserMapperProvider, UserRepositoryProvider } from '../user.provider';
import { UserEntity, UserSchema } from '../adapter/out/user.schema';
import mongoose from 'mongoose';

describe('[User Service] 실제 DB 조회하기', () => {
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
      ],
      providers: [UserService, UserRepositoryProvider, UserMapperProvider],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create and findOne', () => {
    it('should create and find a user', async () => {
      const createUserDto = { nickname: 'testuser', password: 'password123' };
      const createdUser = await userService.create(createUserDto);

      expect(createdUser).toBeDefined();
      const foundUser = await userService.findOne(createdUser.id);

      expect(foundUser).toBeDefined();
      expect(foundUser.nickname).toBe('testuser');
    });
  });
});
