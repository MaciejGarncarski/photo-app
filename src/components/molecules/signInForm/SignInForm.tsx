import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { SignInFormValues, SignInSchema, useSignIn } from '@/src/hooks/useSignIn';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { Input } from '@/src/components/atoms/input/Input';

import { animation } from '@/src/components/pages/signIn/signIn.animation';

import styles from './signInForm.module.scss';

export const SignInForm = () => {
  const { onSubmit } = useSignIn();

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

  return (
    <motion.form {...animation} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input labelText="email" type="email" error={errors.email?.message} {...register('email')} />
      <Input labelText="password" type="password" error={errors.password?.message} {...register('password')} />
      <div className={styles.continueButton}>
        <Button type="submit" variant="primary">
          continue
        </Button>
      </div>
    </motion.form>
  );
};
