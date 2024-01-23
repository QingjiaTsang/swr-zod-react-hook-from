import { z } from 'zod';

export type LoginFormData = z.infer<typeof loginFormDataSchema>;
export type LoginResponseData = z.infer<typeof loginResponseDataSchema>;

export const loginFormDataSchema = z.object({
  account: z.string().trim().min(1, { message: 'Name is required.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

export const loginResponseDataSchema = z.object({
  userId: z.string(),
  token: z.string(),
});
