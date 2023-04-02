import { useAuth } from '@/src/hooks/useAuth';

import { AccessDenied } from '@/src/components/molecules/accessDenied/AccessDenied';
import { Loader } from '@/src/components/molecules/loader/Loader';
import { SignIn } from '@/src/components/pages/signIn/SignIn';

const AuthPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader color="blue" size="normal" />;
  }

  if (isAuthenticated) {
    return <AccessDenied />;
  }

  return <SignIn />;
};

export default AuthPage;
