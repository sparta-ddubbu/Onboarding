import { authAPIs } from './auth';
import { userAPIs } from './users';

const clientAPIs = {
  auth: authAPIs,
  user: userAPIs,
};

export default clientAPIs;
