import { ProtectedPage } from '@/src/components/pages/protected-page/ProtectedPage';
import { SignIn } from '@/src/components/pages/sign-in/SignIn';

const AuthPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn={false}>
      <SignIn />
    </ProtectedPage>
  );
};

export default AuthPage;
