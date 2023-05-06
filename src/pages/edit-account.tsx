import { EditAccount } from '@/src/components/pages/editAccount/EditAccount';
import { ProtectedPage } from '@/src/components/pages/protectedPage/ProtectedPage';

const EditAccountPage = () => {
  return (
    <ProtectedPage shouldBeSignedIn>
      <EditAccount />
    </ProtectedPage>
  );
};

export default EditAccountPage;
