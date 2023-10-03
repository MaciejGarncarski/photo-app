'use client';

import { GoogleLogo, TestTube } from '@phosphor-icons/react';

import { clientEnv } from '@/src/utils/env';

import { Button } from '@/src/components/buttons/button/button';
import { ButtonLink } from '@/src/components/buttons/button-link/button-link';
import { useSignIn } from '@/src/components/forms/auth-form/use-sign-in';

import styles from './other-sign-in-options.module.scss';

export const OtherSignInOptions = () => {
  const { mutate: signInCredentials, isPending } = useSignIn();

  const handleSignInDemo = () => {
    signInCredentials({
      email: 'test@test.pl',
      password: '12345',
    });
  };

  return (
    <div className={styles.otherOptions}>
      <div className={styles.separator}>
        <p className={styles.orWith}>Or sign in using</p>
      </div>
      <div className={styles.other}>
        <ButtonLink href={`${clientEnv.NEXT_PUBLIC_API_ROOT}/auth/google`}>
          <GoogleLogo />
          Google
        </ButtonLink>
        <Button
          type="button"
          variant="primary"
          onClick={handleSignInDemo}
          disabled={isPending}
        >
          <TestTube />
          Test user account
        </Button>
      </div>
    </div>
  );
};
