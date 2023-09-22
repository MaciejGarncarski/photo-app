import { Metadata } from 'next';

import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';
import { RegisterSignIn } from '@/src/components/pages/register-sign-in/register-sign-in';
export const metadata: Metadata = {
  title: 'Sign in to Photo App',
};

const SignInPage = async () => {
  return (
    <ProtectedPage signedIn={false}>
      <RegisterSignIn variant="sign-in" />
    </ProtectedPage>
  );
};

export default SignInPage;
