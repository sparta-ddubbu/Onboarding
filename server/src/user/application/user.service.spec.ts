import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { UserMapperProvider, UserRepositoryProvider } from '../user.provider';
import { UserEntity, UserSchema } from '../adapter/out/user.schema';
import { CreateUserReqDto } from '../adapter/dto/req/user.dto';
import mongoose from 'mongoose';

describe('[User Service] 실제 DB 조회하기', () => {
  let userService: UserService;
  let createdUser;

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

  afterEach(async () => {
    // 테스트가 끝날 때마다 테스트 유저 삭제
    if (createdUser && createdUser.id) {
      await userService.deleteByUserId(createdUser.id);
      createdUser = null;
    }
  });

  describe('유저 생성 플로우를 체크합니다', () => {
    it('정상 생성', async () => {
      const createUserDto: CreateUserReqDto = { nickname: 'testuser4', password: 'password123' };
      createdUser = await userService.create(createUserDto);

      expect(createdUser).toBeDefined();
      const foundUser = await userService.findOne(createdUser.id);

      expect(foundUser).toBeDefined();
      expect(foundUser.nickname).toBe(createUserDto.nickname);
    });

    it('중복 생성 불가', async () => {
      const createUserDto: CreateUserReqDto = { nickname: 'testuser5', password: 'password123' };
      createdUser = await userService.create(createUserDto);
      await expect(userService.create(createUserDto)).rejects.toThrowError('닉네임 중복입니다');
    });
  });
});
