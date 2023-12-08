import { AxiosResponse } from 'axios';

import axiosInstance from '../../base.api';
import { LoginRequest } from './requests/login-request';
import { LoginResponse } from './responses/login.response';

const loginApi = async (requestBody: LoginRequest): Promise<LoginResponse> => {
  return axiosInstance
    .post('/login', requestBody)
    .then((response: AxiosResponse<LoginResponse>) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { loginApi };
