import { z } from 'zod';

export type ChangePswFormData = z.infer<typeof changePswFormDataSchema>;
export type ChangePswResponseData = z.infer<typeof changePswResponseDataSchema>;

export const changePswFormDataSchema = z
  .object({
    account: z.string().trim().min(1, { message: 'Name is required.' }),
    oldPassword: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
    newPassword: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const changePswResponseDataSchema = z.object({});
