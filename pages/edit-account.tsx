import { useAuth } from '@/hooks/useAuth';

import { Loading } from '@/components/atoms/loading/Loading';
import { EditAccount } from '@/components/pages/editAccount/EditAccount';

const EditAccountPage = () => {
  const { session } = useAuth();

  if (!session?.user) {
    return <Loading />;
  }

  return <EditAccount userId={session?.user?.id} />;
};

export default EditAccountPage;
