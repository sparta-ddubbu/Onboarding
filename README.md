## Common

```bash
$ node -v # v22.13.0
$ npm -v # 10.9.2
$ pnpm i
```

## Front

```bash
$ pnpm dev

# e2e tests
# FE, BE 서버 둘다 키고

$ pnpm test:e2e:open
```

## Server

```bash
# watch mode
$ pnpm run start:dev

# unit tests
$ pnpm run test

# e2e tests
# mockUserInfo 정보 수정하기 (회원탈퇴 API 생기면 수정 불필요)
$ pnpm run test:e2e
```
