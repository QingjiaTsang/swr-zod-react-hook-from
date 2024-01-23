import { RemoteApiResponse } from '@/common/response.type';
import { z } from 'zod';

export const errorHandler = <T>(res: RemoteApiResponse<T>, schema: z.Schema<T>) => {
  if (res.code !== 200) {
    return { success: false as const, error: res.message };
  }

  // bad data from backend api response
  if (!schema.safeParse(res.data).success) {
    return { success: false as const, error: 'invalid data from server' };
  }

  return { success: true as const, data: res.data };
};
