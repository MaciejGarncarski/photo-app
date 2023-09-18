'use client';

import { GoogleLogo, TestTube } from '@phosphor-icons/react';

import { useSignIn } from '@/src/hooks/use-sign-in';
import { clientEnv } from '@/src/utils/env';

import { Button } from '@/src/components/buttons/button/button';
import { ButtonLink } from '@/src/components/buttons/button-link/button-link';

import styles from './other-sign-in-options.module.scss';

export const OtherSignInOptions = () => {
  const { mutate: signInCredentials } = useSignIn();

  const handleSignInDemo = () => {
    signInCredentials({
      email: 'test@test.pl',
      password: '12345',
    });
  };

  return (
    <div className={styles.otherOptions}>
      <div className={styles.separator}>
        <p className={styles.orWith}>or with</p>
      </div>
      <div className={styles.other}>
        <ButtonLink href={`${clientEnv.NEXT_PUBLIC_API_ROOT}/api/auth/google`}>
          <GoogleLogo />
          Google
        </ButtonLink>
        <Button type="button" variant="primary" onClick={handleSignInDemo}>
          <TestTube />
          Test user account
        </Button>
      </div>
    </div>
  );
};
