import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(5, { message: 'Password is too short.' }),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

type SignInCredentials = {
  queryClient: QueryClient;
} & SignInFormValues;

export const signInCredentials = async ({ email, password, queryClient }: SignInCredentials) => {
  const { data } = await axios.post('/api/auth/credentials', {
    email,
    password,
  });

  if (data === 'ok') {
    Router.push('/');
  }

  queryClient.invalidateQueries(['session']);
};
