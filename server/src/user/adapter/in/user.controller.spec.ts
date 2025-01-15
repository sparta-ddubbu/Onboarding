import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../../user/application/user.service';
import { JwtAuthGuard } from '../../../auth/jwt/guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from '../out/user.schema';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';

describe('[UserController] Mock DB 조회하기', () => {
  let userController: UserController;
  let userService: UserService;
  const mockUser = {
    id: '123',
    nickname: 'testuser',
    password: 'hashedpassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
      ],
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockUser),
          },
        },
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('유저 password를 반환하지 않습니다.', async () => {
    const req = { user: { id: mockUser.id } };
    const result: any = await userController.getUserInfo(req);

    expect(result).toBeDefined();
    expect(result.password).toBeUndefined();
    expect(result.userId).toBe(mockUser.id);
    expect(result.nickname).toBe(mockUser.nickname);
  });
});
