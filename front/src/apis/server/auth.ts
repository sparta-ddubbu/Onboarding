import serverAxios from './axios';

const refreshAPI = async function () {
  return serverAxios.post('/auth/refresh-token');
};

export const authAPIs = {
  refreshAPI,
};
