import serverAxios from './api.server';
import { UserInfoResponse } from './users.type';

const getInfoAPI = async function () {
  return serverAxios.get<null, UserInfoResponse>('/users/info');
};

export const userAPIs = {
  getInfoAPI,
};
