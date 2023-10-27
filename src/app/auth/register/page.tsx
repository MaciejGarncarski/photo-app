import { Metadata } from 'next';

import { setTitle } from '@/src/utils/set-title';

import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';
import { RegisterSignIn } from '@/src/components/pages/register-sign-in/register-sign-in';

export const metadata: Metadata = {
  title: setTitle('Register'),
};

const RegisterPage = () => {
  return (
    <ProtectedPage sessionNeeded={false}>
      <RegisterSignIn variant="register" />
    </ProtectedPage>
  );
};

export default RegisterPage;
