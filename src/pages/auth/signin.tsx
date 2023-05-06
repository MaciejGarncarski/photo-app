import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';
import { SignIn } from '@/src/components/pages/signIn/SignIn';

const AuthPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn={false}>
      <SignIn />
    </ProtectedPage>
  );
};

export default AuthPage;
