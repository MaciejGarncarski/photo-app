import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './signIn.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { Input } from '@/components/molecules/input/Input';
import { useAuth } from '@/components/organisms/signIn/useAuth';

import google from '~/icons/google.svg';

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
    console.log(email);
  };

  return (
    <main className={styles.container}>
      <h2 className='heading'>Sign in</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input labelText='E-mail' type='email' {...register('email')} />
        <Button type='submit'>Sign in with email</Button>
      </form>
      <div className={styles.separator}>
        <p className={styles.orWith}>or</p>
      </div>
      <div className={styles.other}>
        <Button
          className={styles.button}
          type='button'
          onClick={() => signIn('google', { redirect: true })}
        >
          <Image src={google} priority alt='' />
          <p className={styles.google}>Google</p>
        </Button>
      </div>
    </main>
  );
};
