import { SignInForm } from '@/src/components/forms/sign-in-form/sign-in-form';
import { OtherSignInOptions } from '@/src/components/other-sign-in-options/other-sign-in-options';
import { animation } from '@/src/components/pages/sign-in/sign-in.animation';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './sign-in.module.scss';

export const SignIn = () => {
  return (
    <section className={styles.container}>
      <Heading tag="h2" size="big" {...animation}>
        Sign in or sign up
      </Heading>
      <div className={styles.formContainer}>
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
      </div>
    </section>
  );
};