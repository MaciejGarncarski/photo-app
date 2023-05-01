import { AnimatedPage } from '@/src/components/pages/animatedPage/AnimatedPage';
import { EditAccount } from '@/src/components/pages/editAccount/EditAccount';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

const EditAccountPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <AnimatedPage>
        <EditAccount />
      </AnimatedPage>
    </ProtectedPage>
  );
};

export default EditAccountPage;
