import { Metadata } from 'next';

import { getTitle } from '@/src/utils/get-title';

import { EditAccount } from '@/src/components/pages/edit-account/edit-account';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';

export const metadata: Metadata = {
  title: getTitle('Edit account'),
};

const EditAccountPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <EditAccount />
    </ProtectedPage>
  );
};

export default EditAccountPage;
