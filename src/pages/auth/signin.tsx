import { AnimatedPage } from '@/src/components/pages/animatedPage/AnimatedPage';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';
import { SignIn } from '@/src/components/pages/signIn/SignIn';

const AuthPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn={false}>
      <AnimatedPage>
        <SignIn />
      </AnimatedPage>
    </ProtectedPage>
  );
};

export default AuthPage;
