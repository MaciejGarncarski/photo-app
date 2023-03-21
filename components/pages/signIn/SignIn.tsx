import { Variants } from 'framer-motion';

import { Heading } from '@/components/atoms/heading/Heading';
import { OtherSignInOptions } from '@/components/molecules/otherSignInOptions/OtherSignInOptions';
import { SignInForm } from '@/components/organisms/signInForm/SignInForm';

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

export const SignIn = () => {
  return (
    <main className={styles.container}>
      <Heading tag="h2" className={styles.heading} {...animation}>
        Sign in
      </Heading>
      <SignInForm />
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
