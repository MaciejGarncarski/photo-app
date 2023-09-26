import { EditAccount } from '@/src/components/pages/edit-account/edit-account';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

const EditAccountPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <EditAccount />
    </ProtectedPage>
  );
};

export default EditAccountPage;
