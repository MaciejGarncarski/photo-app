import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import {
  signInCredentials,
  SignInFormValues,
  SignInSchema,
} from '@/src/utils/signIn';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { Input } from '@/src/components/atoms/input/Input';

import { animation } from '@/src/components/pages/signIn/SignIn.animation';

import styles from './SignInForm.module.scss';

export const SignInForm = () => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
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
    await signInCredentials({ email, password, queryClient });
  });

  return (
    <motion.form {...animation} className={styles.form} onSubmit={onSubmit}>
      <Input
        labelText="email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        labelText="password"
        type="password"
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
