import { Metadata } from 'next';

import { setTitle } from '@/src/utils/set-title';

import { EditAccount } from '@/src/components/pages/edit-account/edit-account';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

export const metadata: Metadata = {
  title: setTitle('Edit account'),
};

const EditAccountPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <EditAccount />
    </ProtectedPage>
  );
};

export default EditAccountPage;
