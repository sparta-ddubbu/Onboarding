import clientAxios from './axios';
import { SignInRequest, SignUpRequest, SignUpResponse } from './auth.type';

const signInAPI = async function ({ nickname, password }: SignInRequest) {
  return clientAxios.post<SignInRequest>('/auth/sign-in', { nickname, password });
};

const logoutAPI = async function () {
  return clientAxios.post('/auth/logout');
};

const signUpAPI = async function ({ nickname, password }: SignUpRequest) {
  return clientAxios.post<SignUpRequest, SignUpResponse>('/auth/sign-up', { nickname, password });
};

export const authAPIs = {
  signInAPI,
  logoutAPI,
  signUpAPI,
};
