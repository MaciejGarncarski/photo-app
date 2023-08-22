import { SignInForm } from '@/src/components/forms/sign-in-form/sign-in-form';
import { OtherSignInOptions } from '@/src/components/other-sign-in-options/other-sign-in-options';
import { animation } from '@/src/components/pages/sign-in/sign-in.animation';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './sign-in.module.scss';

export const SignIn = () => {
  return (
    <section className={styles.container}>
      <Heading tag="h2" size="big" {...animation}>
        Sign in
      </Heading>
      <div className={styles.formContainer}>
        <SignInForm />
        <OtherSignInOptions />
      </div>
    </section>
  );
};
