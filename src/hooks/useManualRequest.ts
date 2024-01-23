import { LoginFormData } from '@/zod-schema/loginForm';
import { ChangePswFormData } from '@/zod-schema/changePswForm';

import useSWRMutation from 'swr/mutation';
import api from '@/services';

// manual mutation
export const useManualRequest = () => {
  return {
    LoginCaller: () =>
      useSWRMutation('login', async (url, { arg }: { arg: LoginFormData }) => {
        return api.login(arg);
      }),

    ChangePswCaller: () =>
      useSWRMutation('changePsw', async (url, { arg }: { arg: ChangePswFormData }) => {
        return api.changePsw(arg);
      }),
  };
};
