import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';
import { SignIn } from '@/src/components/pages/sign-in/sign-in';

const AuthPage = async () => {
  return (
    <ProtectedPage shouldBeSignedIn={false}>
      <SignIn />
    </ProtectedPage>
  );
};

export default AuthPage;
