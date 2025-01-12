import axios from 'axios';
import APIs from '.';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

function setAccessToken(token: string) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const apiClientMethods = {
  setAccessToken,
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;
    if (error.response.status === 401) {
      try {
        const res = await APIs.auth.refreshAPI();

        const newAccessToken = res.accessToken;
        if (newAccessToken) {
          apiClientMethods.setAccessToken(newAccessToken);
          return axios(originalConfig);
        }
      } catch (refreshError) {
        console.error(refreshError);
        // logout 혹은 clear accessToken;
        return Promise.reject(refreshError);
      }
    }

    // logout 혹은 clear accessToken;
    return Promise.reject(error);
  },
);
export default apiClient;
