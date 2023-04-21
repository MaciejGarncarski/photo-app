import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Router from 'next/router';
import { z } from 'zod';

import { clientEnv } from '@/src/utils/env';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(5, { message: 'Password is too short.' }),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

type SignInCredentials = {
  queryClient: QueryClient;
} & SignInFormValues;

export const signInCredentials = async ({ email, password, queryClient }: SignInCredentials) => {
  const { data } = await axios.post(
    `${clientEnv.NEXT_PUBLIC_API_ROOT}api/auth/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    },
  );

  queryClient.invalidateQueries(['session']);

  if (data.redirect) {
    Router.push(data.redirect);
  }
};

export const signInGoogle = () => {
  //TODO change to link href
  window.location.href = `${clientEnv.NEXT_PUBLIC_API_ROOT}auth/google`;
};
