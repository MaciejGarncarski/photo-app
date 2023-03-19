import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { SignInFormValues } from '@/components/pages/signIn/SignIn';

export const useSignIn = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<SignInFormValues> = async ({ email, password }) => {
    const request = await signIn('credentials', { redirect: false, email, password });

    if (request?.ok) {
      router.push('/');
    }

    if (request?.error) {
      toast.error('Error, try again later.');
    }
  };

  const signInGoogle = async () => {
    await signIn('google', { redirect: true });
  };

  const signInDemo = async () => {
    await signIn('credentials', {
      redirect: true,
      email: 'test@test.pl',
      password: '12345',
    });
  };

  return { signInDemo, signInGoogle, onSubmit };
};
