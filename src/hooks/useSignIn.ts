import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(5, { message: 'Password is too short.' }),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

export const useSignIn = () => {
  const router = useRouter();

  const signInCredentials = async ({ email, password }: SignInFormValues) => {
    const request = await signIn('credentials', { redirect: false, email, password });

    if (request?.error || !request) {
      return toast.error('Invalid email or password.');
    }

    if (request.ok) {
      return router.push('/');
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

  return { signInDemo, signInGoogle, signInCredentials };
};
