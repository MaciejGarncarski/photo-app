import { useAuth } from '@/hooks/useAuth';

import { Loading } from '@/components/atoms/loading/Loading';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { SignIn } from '@/components/organisms/signIn/SignIn';

const AuthPage = () => {
  const { status } = useAuth();

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    return <AccessDenied />;
  }

  return <SignIn />;
};

export default AuthPage;
