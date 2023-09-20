import { Metadata } from 'next';

import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';
import { SignIn } from '@/src/components/pages/sign-in/sign-in';
export const metadata: Metadata = {
  title: 'Sign in to Photo App',
};

const AuthPage = async () => {
  return (
    <ProtectedPage shouldBeSignedIn={false}>
      <SignIn />
    </ProtectedPage>
  );
};

export default AuthPage;
