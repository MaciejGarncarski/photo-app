import { useAuth } from '@/hooks/useAuth';

import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { Loader } from '@/components/molecules/loader/Loader';
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
