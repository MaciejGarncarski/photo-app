import Link from 'next/link';

import styles from './register-signin-message.module.scss';
type Props = {
  variant: 'register' | 'sign-in';
};

export const RegisterSignInMessage = ({ variant }: Props) => {
  const isRegister = variant === 'register';

  const mainText = isRegister
    ? 'Already have an account?'
    : "Don't have an account?";
  const linkText = isRegister ? 'Sign in here.' : 'Register here.';
  const href = isRegister ? '/auth/sign-in' : '/auth/register';

  return (
    <p className={styles.registerSignInMessage}>
      {mainText}{' '}
      <Link className={styles.link} href={href}>
        {linkText}
      </Link>
    </p>
  );
};
