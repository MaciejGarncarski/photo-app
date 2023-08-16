'use client';

import { IconBrandGoogle, IconTestPipe } from '@tabler/icons-react';
import Link from 'next/link';

import { useSignIn } from '@/src/hooks/use-sign-in';
import { clientEnv } from '@/src/utils/env';

import { Button } from '@/src/components/buttons/button/button';

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
        <div className={styles.button}>
          <Button type="button" variant="primary" onClick={handleSignInDemo}>
            <IconTestPipe />
            Demo account
          </Button>
        </div>

        <div className={styles.button}>
          <Link
            href={`${clientEnv.NEXT_PUBLIC_API_ROOT}/auth/google`}
            className={styles.link}
          >
            <IconBrandGoogle />
            Google
          </Link>
        </div>
      </div>
    </div>
  );
};
