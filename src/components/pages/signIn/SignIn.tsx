import { Heading } from '@/src/components/atoms/heading/Heading';

import { OtherSignInOptions } from '@/src/components/molecules/otherSignInOptions/OtherSignInOptions';
import { SignInForm } from '@/src/components/molecules/signInForm/SignInForm';

import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';
import { animation } from '@/src/components/pages/signIn/signIn.animation';

import styles from './signIn.module.scss';

export const SignIn = () => {
  return (
    <ProtectedPage shouldBeSignedIn={false}>
      <main className={styles.container}>
        <Heading tag="h2" size="big" {...animation}>
          Sign in
        </Heading>
        <SignInForm />
        <OtherSignInOptions />
        <div className={styles.info} {...animation}>
          <Heading tag="h3" size="small">
            How to sign in with demo account?
          </Heading>
          <p>Sign in with these credentials: </p>
          <ul className={styles.list}>
            <li>Email: test@test.pl</li>
            <li>Password: 12345</li>
          </ul>
          <p>Also you can click button above named &quot;Demo account&quot;.</p>
        </div>
      </main>
    </ProtectedPage>
  );
};
