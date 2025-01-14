import axios from 'axios';
import { severTokenManager } from '../jwt/util.server';
import serverAPIs from './server';

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

serverAxios.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken } = await severTokenManager();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers.Cookie = `refreshToken=${refreshToken};`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

serverAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('interceptor error', error);
    const originalConfig = error.config;

    if (error.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const { accessToken, refreshToken } = await severTokenManager();

        console.log('[prev] accessToken', accessToken);
        console.log('[prev] refreshToken', refreshToken);
        console.log('갱신 시작');
        await serverAPIs.auth.refreshAPI();
        console.log('갱신 끝');
        const tokens = await severTokenManager();

        console.log('[after] accessToken', tokens.accessToken);
        console.log('[after] refreshToken', tokens.refreshToken);
        return serverAxios(originalConfig);
      } catch (refreshError) {
        console.error(refreshError);
        // TODO: 로그아웃
        return Promise.reject(refreshError);
      }
    } else {
      // TODO: error modal
    }

    // TODO: 로그아웃
    return Promise.reject(error);
  },
);
export default serverAxios;
