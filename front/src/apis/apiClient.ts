import axios from 'axios';
import APIs from '.';
import { tokenManager } from './jwt/server-side.util';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    const { clearTokens } = await tokenManager();

    if (error.response.status === 401) {
      try {
        const res = await APIs.auth.refreshAPI();
        return axios(originalConfig);
      } catch (refreshError) {
        console.error(refreshError);
        clearTokens();
        return Promise.reject(refreshError);
      }
    }

    clearTokens();
    return Promise.reject(error);
  },
);
export default apiClient;
