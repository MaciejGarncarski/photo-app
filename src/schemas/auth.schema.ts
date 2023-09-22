import { z } from 'zod';

import { username } from '@/src/components/edit-account-stages/account-details-validation';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(5, { message: 'Password is too short.' }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email.' }),
    username: username,
    password: z.string().min(5, { message: 'Password is too short.' }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password.startsWith(confirmPassword)) {
      return;
    }

    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
