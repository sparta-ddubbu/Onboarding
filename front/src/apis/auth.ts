import serverAxios from './api.server';
import { SignInResponse, SignInRequest, SignUpRequest, SignUpResponse, RefreshResponse } from './auth.type';

const signInAPI = async function ({ nickname, password }: SignInRequest) {
  const res = await serverAxios.post<SignInRequest, SignInResponse>('/auth/sign-in', { nickname, password });

  return res;
};

const logoutAPI = async function () {
  return serverAxios.post('/auth/logout');
};

const signUpAPI = async function ({ nickname, password }: SignUpRequest) {
  return serverAxios.post<SignUpRequest, SignUpResponse>('/auth/sign-up', { nickname, password });
};

const refreshAPI = async function () {
  return serverAxios.post<null, RefreshResponse>('/auth/refresh-token');
};

export const authAPIs = {
  signInAPI,
  logoutAPI,
  signUpAPI,
  refreshAPI,
};
