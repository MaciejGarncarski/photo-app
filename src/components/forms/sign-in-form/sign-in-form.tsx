'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { useSignIn } from '@/src/hooks/use-sign-in';

import { Button } from '@/src/components/buttons/button/button';
import { Input } from '@/src/components/input/input';
import { animation } from '@/src/components/pages/sign-in/sign-in.animation';
import { SignInFormValues, SignInSchema } from '@/src/schemas/sign-in.schema';

import styles from './sign-in-form.module.scss';

export const SignInForm = () => {
  const { mutate: signInCredentials } = useSignIn();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    await signInCredentials({ email, password });
  });

  return (
    <motion.form {...animation} className={styles.form} onSubmit={onSubmit}>
      <Input
        labelText="email"
        type="email"
        isEmpty={getValues('email') === ''}
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        labelText="password"
        type="password"
        isEmpty={getValues('password') === ''}
        error={errors.password?.message}
        {...register('password')}
      />
      <div className={styles.continueButton}>
        <Button type="submit" variant="primary">
          continue
        </Button>
      </div>
    </motion.form>
  );
};
