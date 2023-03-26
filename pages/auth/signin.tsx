import { useAuth } from '@/hooks/useAuth';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { SignIn } from '@/components/pages/signIn/SignIn';

const AuthPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader variant="margin-top" />;
  }

  if (isAuthenticated) {
    return <AccessDenied />;
  }

  return <SignIn />;
};

export default AuthPage;
