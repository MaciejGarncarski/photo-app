import { IconBrandGoogle, IconTestPipe } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { clientEnv } from '@/src/utils/env';
import { signInCredentials } from '@/src/utils/signIn';

import { Button } from '@/src/components/atoms/buttons/button/Button';

import styles from './OtherSignInOptions.module.scss';

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
