import axios from 'axios';
import { severTokenManager } from '../jwt/util.server';

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

serverAxios.interceptors.request.use(
  async (config) => {
    const { accessToken } = await severTokenManager();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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

    if (error.response?.status === 401) {
      try {
        console.log('TODO: refresh');
        // await APIs.auth.refreshAPI();
        return axios(originalConfig);
      } catch (refreshError) {
        console.error(refreshError);
        // await APIs.auth.logoutAPI();
        return Promise.reject(refreshError);
      }
    } else {
      // TODO: error modal
    }

    // await APIs.auth.logoutAPI();
    return Promise.reject(error);
  },
);
export default serverAxios;
