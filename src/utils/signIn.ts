import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(5, { message: 'Password is too short.' }),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

type SignInCredentials = SignInFormValues & {
  onSuccess: () => void;
};

export const signInCredentials = async ({ email, password, onSuccess }: SignInCredentials) => {
  const request = await signIn('credentials', { redirect: false, email, password });

  if (request?.error || !request) {
    return toast.error('Invalid email or password.');
  }

  if (request.ok) {
    onSuccess();
  }
};

export const signInGoogle = async () => {
  await signIn('google', { redirect: true });
};

export const signInDemo = async () => {
  await signIn('credentials', {
    redirect: true,
    email: 'test@test.pl',
    password: '12345',
  });
};
