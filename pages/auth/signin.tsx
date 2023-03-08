import { useAuth } from '@/hooks/useAuth';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { SignIn } from '@/components/pages/signIn/SignIn';

const AuthPage = () => {
  const { status } = useAuth();

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'authenticated') {
    return <AccessDenied />;
  }

  return <SignIn />;
};

export default AuthPage;
