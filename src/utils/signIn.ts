import { QueryClient } from '@tanstack/react-query';
import Router from 'next/router';
import { toast } from 'react-hot-toast';
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
  const requestPromise = new Promise(async (resolve) => {
    const { data } = await apiClient.post('auth/login', {
      email,
      password,
    });

    if (data === 'ok') {
      Router.push('/');
    }
    await queryClient.invalidateQueries(['session']);
    resolve('pk');
  });

  toast.promise(requestPromise, { error: 'Cannot signin.', loading: 'Loading...', success: 'Success!' });
};
