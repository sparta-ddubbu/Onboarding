import clientAxios from './axios';
import { UserInfoResponse } from './users.type';

const getInfoAPI = async function () {
  return clientAxios.get<null, UserInfoResponse>('/users/info');
};

export const userAPIs = {
  getInfoAPI,
};
