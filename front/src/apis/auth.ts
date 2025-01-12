import apiClient from './apiClient';
import { SignInResponse, SignInRequest, SignUpRequest, SignUpResponse, RefreshResponse } from './auth.type';

const signInAPI = async function ({ nickname, password }: SignInRequest) {
  const res = await apiClient.post<SignInRequest, SignInResponse>('/users/sign-in', { nickname, password });

  return res;
};

const signUpAPI = async function ({ nickname, password }: SignUpRequest) {
  return apiClient.post<SignUpRequest, SignUpResponse>('/users/sign-up', { nickname, password });
};

const refreshAPI = async function () {
  return apiClient.post<null, RefreshResponse>('/users/refresh-token');
};

export const authAPIs = {
  signInAPI,
  signUpAPI,
  refreshAPI,
};