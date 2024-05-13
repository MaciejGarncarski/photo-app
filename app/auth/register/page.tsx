import { Metadata } from 'next';

import { getPageTitle } from '@/utils/get-page-title';

import { ProtectedPage } from '@/components/pages/protected-page/protected-page';
import { RegisterSignIn } from '@/components/pages/register-sign-in/register-sign-in';

export const metadata: Metadata = {
  title: getPageTitle('Register'),
};

const RegisterPage = () => {
  return (
    <ProtectedPage sessionNeeded={false}>
      <RegisterSignIn variant="register" />
    </ProtectedPage>
  );
};

export default RegisterPage;
