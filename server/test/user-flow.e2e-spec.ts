import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserReqDto } from '../src/user/adapter/dto/req/user.dto';

describe('[유저] 회원가입, 로그인, 회원정보 조회', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('should sign up a user and retrieve their info', async () => {
    // 임시) 신규 테스트마다 nickname 새로 설정하기
    // TODO) 테스트 통과를 위해 로그인 후 탈퇴 로직 추가 필요
    const mockUserInfo: CreateUserReqDto = { nickname: 'helloworld13', password: 'password' };

    const signUpResponse = await request(app.getHttpServer()).post('/auth/sign-up').send(mockUserInfo);
    expect(signUpResponse.status).toBe(201);

    const loginResponse = await request(app.getHttpServer()).post('/auth/sign-in').send(mockUserInfo);
    expect(loginResponse.status).toBe(201);

    const rawCookies = loginResponse.headers['set-cookie'];
    let cookies: string[] = [];
    if (Array.isArray(rawCookies)) {
      cookies = rawCookies;
    } else {
      console.error('Expected cookies to be an array, but got:', typeof rawCookies);
    }
    expect(cookies).toBeDefined();

    const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('accessToken='));
    expect(accessTokenCookie).toBeDefined();
    expect(accessTokenCookie).toContain('HttpOnly');

    const [key, value] = accessTokenCookie.split('=');
    expect(key).toBe('accessToken');
    expect(value).toBeDefined();
    const accessToken = value.split(';')[0];

    const userInfoResponse = await request(app.getHttpServer())
      .get('/users/info')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(userInfoResponse.body).toBeDefined();
    expect(userInfoResponse.body.nickname).toBe(mockUserInfo.nickname);
  });
});
