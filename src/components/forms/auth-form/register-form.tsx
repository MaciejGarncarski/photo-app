import { zodResolver } from '@hookform/resolvers/zod';
import { SignIn } from '@phosphor-icons/react';
import { useForm } from 'react-hook-form';

import { Button } from '@/src/components/buttons/button/button';
import { useRegister } from '@/src/components/forms/auth-form/use-register';
import { RegisterSignInMessage } from '@/src/components/forms/register-signin-message/register-signin-message';
import { Input } from '@/src/components/input/input';
import { RegisterFormValues, registerSchema } from '@/src/schemas/auth.schema';

import styles from './auth-form.module.scss';

export const RegisterForm = () => {
  const { mutate: mutateRegister, isPending } = useRegister();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => mutateRegister(data));

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        placeholder="email@example.com"
        labelText="Email"
        type="email"
        variant="secondary"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        placeholder="Your username"
        labelText="Username"
        type="text"
        variant="secondary"
        error={errors.username?.message}
        {...register('username')}
      />

      <Input
        placeholder="Type in your password"
        labelText="Password"
        variant="secondary"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Input
        placeholder="Type in again your password"
        labelText="Confirm password"
        variant="secondary"
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button type="submit" variant="primary" disabled={isPending}>
        Continue
        <SignIn />
      </Button>

      <RegisterSignInMessage variant="register" />
    </form>
  );
};
