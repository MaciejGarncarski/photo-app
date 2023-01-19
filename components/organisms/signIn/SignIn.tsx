import { IconBrandGoogle } from '@tabler/icons';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './signIn.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Input } from '@/components/molecules/input/Input';
import { useAuth } from '@/components/organisms/signIn/useAuth';

type FormValues = {
  email: string;
};

export const SignIn = () => {
  const { signIn } = useAuth();

  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = ({ email }) => {
    signIn('email', { email });
  };

  return (
    <main className={styles.container}>
      <Heading tag="h2">Sign in</Heading>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input labelText="E-mail" type="email" {...register('email')} />
        <Button type="submit">Sign in with email</Button>
      </form>
      <div className={styles.separator}>
        <p className={styles.orWith}>or</p>
      </div>
      <div className={styles.other}>
        <Button className={styles.button} type="button" onClick={() => signIn('google', { redirect: true })}>
          <IconBrandGoogle />
          <p className={styles.google}>Google</p>
        </Button>
      </div>
    </main>
  );
};
