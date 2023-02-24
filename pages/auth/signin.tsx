import { useAuth } from '@/hooks/useAuth';

import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { SignIn } from '@/components/pages/signIn/SignIn';

const AuthPage = () => {
  const { status } = useAuth();

  if (status === 'loading') {
    return null;
  }

  if (status === 'authenticated') {
    return <AccessDenied />;
  }

  return <SignIn />;
};

export default AuthPage;
