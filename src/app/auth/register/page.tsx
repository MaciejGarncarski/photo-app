import { Metadata } from 'next';

import { getTitle } from '@/src/utils/get-title';

import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';
import { RegisterSignIn } from '@/src/components/pages/register-sign-in/register-sign-in';

export const metadata: Metadata = {
  title: getTitle('Register'),
};

const RegisterPage = () => {
  return (
    <ProtectedPage sessionNeeded={false}>
      <RegisterSignIn variant="register" />
    </ProtectedPage>
  );
};

export default RegisterPage;
