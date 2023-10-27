import { Metadata } from 'next';

import { setTitle } from '@/src/utils/set-title';

import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';
import { RegisterSignIn } from '@/src/components/pages/register-sign-in/register-sign-in';

export const metadata: Metadata = {
  title: setTitle('Sign in'),
};

const SignInPage = () => {
  return (
    <ProtectedPage sessionNeeded={false}>
      <RegisterSignIn variant="sign-in" />
    </ProtectedPage>
  );
};

export default SignInPage;
