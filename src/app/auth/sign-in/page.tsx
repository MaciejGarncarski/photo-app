import { Metadata } from 'next';

import { getTitle } from '@/src/utils/get-title';

import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';
import { RegisterSignIn } from '@/src/components/pages/register-sign-in/register-sign-in';

export const metadata: Metadata = {
  title: getTitle('Sign in'),
};

const SignInPage = () => {
  return (
    <ProtectedPage sessionNeeded={false}>
      <RegisterSignIn variant="sign-in" />
    </ProtectedPage>
  );
};

export default SignInPage;
