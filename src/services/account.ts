import { RemoteApiResponse } from '@/common/response.type';
import { LoginFormData, LoginResponseData, loginResponseDataSchema } from '@/zod-schema/loginForm';

import { axiosInstance } from '@/services/basicAxios';
import { AxiosError, AxiosResponse } from 'axios';
import { errorHandler } from '@/utils/errorHandler';
import {
  ChangePswFormData,
  ChangePswResponseData,
  changePswResponseDataSchema,
} from '@/zod-schema/changePswForm';

export const login = async (data: LoginFormData) => {
  try {
    const response: AxiosResponse<RemoteApiResponse<LoginResponseData>> = await axiosInstance.post(
      '/operate/admins/auth/login',
      data
    );

    return errorHandler(response.data, loginResponseDataSchema);
  } catch (error) {
    console.error(`unexpected error from login`, error);
    return { success: false as const, error: 'something went wrong' };
  }
};

export const changePsw = async (data: ChangePswFormData) => {
  try {
    const response: AxiosResponse<RemoteApiResponse<ChangePswResponseData>> =
      await axiosInstance.put('/operate/admins/auth/password', data);

    return errorHandler(response.data, changePswResponseDataSchema);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(`unexpected error from changePsw`, error.cause);
    }
    return { success: false as const, error: 'something went wrong' };
  }
};
