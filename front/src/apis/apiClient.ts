import axios from 'axios';
import APIs from '.';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 401) {
      try {
        const res = await APIs.auth.refreshAPI();
        return axios(originalConfig);
      } catch (refreshError) {
        console.error(refreshError);
        // TODO: logout 혹은 clear accessToken;
        return Promise.reject(refreshError);
      }
    }

    // TODO: logout 혹은 clear accessToken;
    return Promise.reject(error);
  },
);
export default apiClient;
