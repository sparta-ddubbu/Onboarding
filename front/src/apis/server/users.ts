import serverAxios from './axios';
import { UserInfoResponse } from './users.type';

const getInfoAPI = async function () {
  return serverAxios.get<null, UserInfoResponse>('/users/info');
};

export const userAPIs = {
  getInfoAPI,
};
