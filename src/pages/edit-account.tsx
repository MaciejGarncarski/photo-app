import { EditAccount } from '@/src/components/pages/editAccount/EditAccount';
import { ProtectedPage } from '@/src/components/pages/protected-page/ProtectedPage';

const EditAccountPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <EditAccount />
    </ProtectedPage>
  );
};

export default EditAccountPage;
