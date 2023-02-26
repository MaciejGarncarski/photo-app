import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandGoogle } from '@tabler/icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Input } from '@/components/molecules/input/Input';

import styles from './signIn.module.scss';

const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

type FormValues = z.infer<typeof SignInSchema>;

export const SignIn = () => {
  const { signIn } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(SignInSchema),
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = ({ email }) => {
    signIn('email', { email });
  };

  const signInGoogle = async () => {
    await signIn('google', { redirect: true });
  };

  return (
    <main className={styles.container}>
      <Heading tag="h2">Sign in</Heading>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input labelText="With Magic link" type="email" error={errors.email} {...register('email')} />
        <Button type="submit" className={styles.signInButton}>
          Sign in
        </Button>
      </form>
      <div className={styles.separator}>
        <p className={styles.orWith}>or with</p>
      </div>
      <div className={styles.other}>
        <Button className={styles.button} type="button" onClick={signInGoogle}>
          <IconBrandGoogle />
          <p className={styles.google}>Google</p>
        </Button>
      </div>
    </main>
  );
};
