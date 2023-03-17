import { zodResolver } from '@hookform/resolvers/zod';
import { IconBrandGoogle, IconTestPipe } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/atoms/buttons/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Input } from '@/components/atoms/input/Input';

import styles from './signIn.module.scss';

const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(5, { message: 'Password is too short.' }),
});

type FormValues = z.infer<typeof SignInSchema>;

export const SignIn = () => {
  const router = useRouter();
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
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    const request = await signIn('credentials', { redirect: false, email, password });

    if (request?.ok) {
      router.push('/');
    }

    if (request?.error) {
      toast.error('Error, try again later.');
    }
  };

  const signInGoogle = async () => {
    await signIn('google', { redirect: true });
  };

  const signInDemo = async () => {
    await signIn('credentials', {
      redirect: true,
      email: 'test@test.pl',
      password: '12345',
    });
  };

  return (
    <main className={styles.container}>
      <Heading tag="h2" className={styles.heading}>
        Sign in
      </Heading>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input labelText="email" type="email" error={errors.email} {...register('email')} />
        <Input labelText="password" type="password" error={errors.password} {...register('password')} />
        <Button type="submit" className={styles.signInButton}>
          Continue
        </Button>
      </form>
      <div className={styles.otherOptions}>
        <div className={styles.separator}>
          <p className={styles.orWith}>or with</p>
        </div>
        <div className={styles.other}>
          <Button className={styles.otherButton} type="button" onClick={signInDemo}>
            <IconTestPipe />
            <p className={styles.otherButtonText}>Demo account</p>
          </Button>
          <Button className={styles.otherButton} type="button" onClick={signInGoogle}>
            <IconBrandGoogle />
            <p className={styles.otherButtonText}>Google</p>
          </Button>
        </div>
      </div>
      <div className={styles.info}>
        <Heading tag="h3">How to sign in with demo account?</Heading>
        <p>Sign in with these credentials: </p>
        <ul className={styles.list}>
          <li>Email: test@test.pl</li>
          <li>Password: 12345</li>
        </ul>
        <p>Also you can click button above named &quot;Demo account&quot;.</p>
      </div>
    </main>
  );
};
