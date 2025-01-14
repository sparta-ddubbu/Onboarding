import serverAxios from './axios';
import { SignInRequest, SignUpRequest, SignUpResponse } from './auth.type';

const signInAPI = async function ({ nickname, password }: SignInRequest) {
  return serverAxios.post<SignInRequest>('/auth/sign-in', { nickname, password });
};

const logoutAPI = async function () {
  return serverAxios.post('/auth/logout');
};

const signUpAPI = async function ({ nickname, password }: SignUpRequest) {
  return serverAxios.post<SignUpRequest, SignUpResponse>('/auth/sign-up', { nickname, password });
};

export const authAPIs = {
  signInAPI,
  logoutAPI,
  signUpAPI,
};
