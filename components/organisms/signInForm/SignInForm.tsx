import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm, UseFormProps } from 'react-hook-form';

import { SignInFormValues, SignInSchema, useSignIn } from '@/hooks/useSignIn';

import { Button } from '@/components/atoms/buttons/button/Button';
import { Input } from '@/components/atoms/input/Input';
import { animation } from '@/components/pages/signIn/signIn.animation';

import styles from './signInForm.module.scss';

const formOptions: UseFormProps<SignInFormValues> = {
  resolver: zodResolver(SignInSchema),
  mode: 'all',
  defaultValues: {
    email: '',
    password: '',
  },
};

export const SignInForm = () => {
  const { onSubmit } = useSignIn();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormValues>(formOptions);

  return (
    <motion.form {...animation} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input labelText="email" type="email" error={errors.email} {...register('email')} />
      <Input labelText="password" type="password" error={errors.password} {...register('password')} />
      <Button variant="primary" type="submit">
        Continue
      </Button>
    </motion.form>
  );
};
