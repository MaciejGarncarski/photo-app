import { zodResolver } from '@hookform/resolvers/zod';
import { motion, Variants } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useSignIn } from '@/hooks/useSignIn';

import { Button } from '@/components/atoms/buttons/button/Button';
import { Heading } from '@/components/atoms/heading/Heading';
import { Input } from '@/components/atoms/input/Input';
import { OtherSignInOptions } from '@/components/molecules/otherSignInOptions/OtherSignInOptions';

import styles from './signIn.module.scss';

const itemVariant: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};

export const animation = {
  variants: itemVariant,
  initial: 'hidden',
  animate: 'visible',
};

const SignInSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(5, { message: 'Password is too short.' }),
});

export type SignInFormValues = z.infer<typeof SignInSchema>;

export const SignIn = () => {
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
    <main className={styles.container}>
      <Heading tag="h2" className={styles.heading} {...animation}>
        Sign in
      </Heading>
      <motion.form {...animation} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input labelText="email" type="email" error={errors.email} {...register('email')} />
        <Input labelText="password" type="password" error={errors.password} {...register('password')} />
        <Button type="submit" className={styles.signInButton}>
          Continue
        </Button>
      </motion.form>
      <OtherSignInOptions />
      <div className={styles.info} {...animation}>
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
