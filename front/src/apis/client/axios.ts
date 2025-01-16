import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import clientAPIs from '.';
import { severTokenManager } from '../jwt/util.server';

interface ServerError {
  id: string;
  errorCode: string;
  message: string;
  apiMessage: string;
  status: number;
  timestamp: string;
}

interface AxiosErrorWithBusinessError {
  response: AxiosResponse<ServerError>;
  config: AxiosRequestConfig & { _retry?: boolean };
}

export class BusinessError {
  id: string;
  errorCode: string;
  apiMessage: string;

  constructor(error: ServerError) {
    this.id = error.id;
    this.errorCode = error.errorCode;
    this.apiMessage = error.apiMessage || '잠시 후 다시 시도해주세요';
  }
}

const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

clientAxios.interceptors.request.use(
  async (config) => {
    const { accessToken } = await severTokenManager();
    if (accessToken) {
      // TODO: 꺼낼 수 있는지 확인 필요
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

clientAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosErrorWithBusinessError) => {
    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        console.log('갱신 시작');
        await clientAPIs.auth.refreshAPI();
        console.log('갱신 끝');

        return clientAxios(originalConfig);
      } catch (refreshError) {
        console.error(refreshError);
        // TODO: 로그아웃
        return Promise.reject(refreshError);
      }
    }

    throw new BusinessError(error.response.data);
  },
);

export default clientAxios;
