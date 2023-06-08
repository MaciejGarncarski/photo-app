import { IconLogin } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './SignInButton.module.scss';

export const SignInButton = () => {
  return (
    <Link data-cy="signin button" href="/auth/signin" className={styles.button}>
      <IconLogin />
      Sign in
    </Link>
  );
};
