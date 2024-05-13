'use client';

import { RegisterForm } from '@/components/forms/auth-form/register-form';
import { SignInForm } from '@/components/forms/auth-form/sign-in-form';
import { OtherSignInOptions } from '@/components/other-sign-in-options/other-sign-in-options';
import { Heading } from '@/components/typography/heading/heading';

import styles from './register-sign-in.module.scss';

type Props = {
  variant: 'register' | 'sign-in';
};

export const RegisterSignIn = ({ variant }: Props) => {
  const isRegister = variant === 'register';

  return (
    <section className={styles.container}>
      <Heading tag="h2" size="big">
        {variant === 'register' ? 'Register' : 'Sign in'}
      </Heading>
      <div className={styles.formContainer}>
        {isRegister ? <RegisterForm /> : <SignInForm />}
        <OtherSignInOptions />
      </div>
    </section>
  );
};
