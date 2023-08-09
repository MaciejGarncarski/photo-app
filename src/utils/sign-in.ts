import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { apiClient } from '@/src/utils/api-client';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(5, { message: 'Password is too short.' }),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

type SignInCredentials = {
  queryClient: QueryClient;
} & SignInFormValues;

export const signInCredentials = async ({
  email,
  password,
  queryClient,
}: SignInCredentials) => {
  const requestPromise = new Promise(async (resolve) => {
    await apiClient.post('auth/login', {
      email,
      password,
    });

    await queryClient.invalidateQueries(['session']);

    resolve('success');
  });

  toast.promise(requestPromise, {
    error: 'Cannot signin.',
    loading: 'Loading...',
    success: 'Success!',
  });
};
