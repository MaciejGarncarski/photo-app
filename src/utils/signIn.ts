import { QueryClient } from '@tanstack/react-query';
import Router from 'next/router';
import { z } from 'zod';

import { apiClient } from '@/src/utils/apis/apiClient';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(5, { message: 'Password is too short.' }),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

type SignInCredentials = {
  queryClient: QueryClient;
} & SignInFormValues;

export const signInCredentials = async ({ email, password, queryClient }: SignInCredentials) => {
  const { data } = await apiClient.post('auth/login', {
    email,
    password,
  });

  await queryClient.invalidateQueries(['session']);

  if (data === 'ok') {
    Router.push('/');
  }
};
