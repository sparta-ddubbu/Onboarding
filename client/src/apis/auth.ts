import apiClient from './apiClient';
import { SignInResponse, SignInRequest, SignUpRequest, SignUpResponse, RefreshResponse } from './auth.type';

export const signInAPI = function ({ nickname, password }: SignInRequest) {
  return apiClient.post<SignInResponse, {}, SignInRequest>('/users/sign-in', { nickname, password });
};

export const signUpAPI = function ({ nickname, password }: SignUpRequest) {
  return apiClient.post<SignUpResponse, {}, SignUpRequest>('/users/sign-up', { nickname, password });
};

export const refreshAPI = function () {
  return apiClient.post<RefreshResponse>('/users/refresh-token');
};
