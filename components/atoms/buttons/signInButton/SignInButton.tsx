import Link from 'next/link';

import styles from './signInButton.module.scss';

export const SignInButton = () => {
  return (
    <Link href="/auth/signin" className={styles.button}>
      Sign in
    </Link>
  );
};
