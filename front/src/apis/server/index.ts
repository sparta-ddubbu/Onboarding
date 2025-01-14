import { authAPIs } from './auth';
import { userAPIs } from './users';

const serverAPIs = {
  auth: authAPIs,
  user: userAPIs,
};

export default serverAPIs;
