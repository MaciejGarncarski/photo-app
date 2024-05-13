import { Metadata } from 'next';

import { getPageTitle } from '@/utils/get-page-title';

import { EditAccount } from '@/components/pages/edit-account/edit-account';
import { ProtectedPage } from '@/components/pages/protected-page/protected-page';

export const metadata: Metadata = {
  title: getPageTitle('Edit account'),
};

const EditAccountPage = () => {
  return (
    <ProtectedPage sessionNeeded>
      <EditAccount />
    </ProtectedPage>
  );
};

export default EditAccountPage;
