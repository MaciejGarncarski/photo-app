'use client';

import { IconBrandGoogle, IconTestPipe } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { clientEnv } from '@/src/utils/env';
import { signInCredentials } from '@/src/utils/sign-in';

import { Button } from '@/src/components/buttons/button/button';

import styles from './other-sign-in-options.module.scss';

export const OtherSignInOptions = () => {
  const queryClient = useQueryClient();

  const handleSignInDemo = () => {
    signInCredentials({
      email: 'test@test.pl',
      password: '12345',
      queryClient,
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
