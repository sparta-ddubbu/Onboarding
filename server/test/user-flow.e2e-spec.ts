import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserReqDto } from '../src/user/adapter/dto/req/user.dto';

describe('[유저] 회원가입, 로그인, 회원정보 조회', () => {
  let app: INestApplication;
  const mockUserInfo = {
    nickname: 'nick1',
    password: 'password',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / 기본', async () => {
    const response = await request(app.getHttpServer()).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });

  it('POST /auth/sign-up - 회원가입', async () => {
    const signUpResponse = await request(app.getHttpServer()).post('/auth/sign-up').send(mockUserInfo);

    expect(signUpResponse.status).toBe(201);
    expect(signUpResponse.body.userId).toBeDefined();
    expect(signUpResponse.body.nickname).toBe(mockUserInfo.nickname);
  });

  it('POST /auth/sign-in - 로그인', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/sign-in').send(mockUserInfo);
    expect(loginResponse.status).toBe(201);

    const rawCookies = loginResponse.headers['set-cookie'];
    const cookies: string[] = rawCookies as unknown as string[];
    const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('accessToken='));
    expect(accessTokenCookie).toBeDefined();
    expect(accessTokenCookie).toContain('HttpOnly');
  });

  it('GET /users/info - 회원정보 조회', async () => {
    const loginResponse = await request(app.getHttpServer()).post('/auth/sign-in').send(mockUserInfo);
    expect(loginResponse.status).toBe(201);

    const rawCookies = loginResponse.headers['set-cookie'];
    const cookies: string[] = rawCookies as unknown as string[];
    const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('accessToken='));
    const accessToken = accessTokenCookie.split('=')[1].split(';')[0];

    const userInfoResponse = await request(app.getHttpServer())
      .get('/users/info')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(userInfoResponse.body).toBeDefined();
    expect(userInfoResponse.body.nickname).toBe(mockUserInfo.nickname);
  });
});
