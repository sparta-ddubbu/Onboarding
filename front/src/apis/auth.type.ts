type UserTokenRespone = { accessToken: string };

export type SignInRequest = {
  nickname: string;
  password: string;
};

export type SignInResponse = UserTokenRespone;

export type SignUpRequest = { nickname: string; password: string };

export type SignUpResponse = null;

export type RefreshResponse = UserTokenRespone;
