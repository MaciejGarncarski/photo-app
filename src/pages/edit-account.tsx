import { useAuth } from '@/hooks/useAuth';

import { Loader } from '@/components/molecules/loader/Loader';
import { EditAccount } from '@/components/pages/editAccount/EditAccount';

const EditAccountPage = () => {
  const { isLoading, session } = useAuth();

  if (isLoading || !session?.user?.id) {
    return <Loader color="blue" size="normal" />;
  }

  return <EditAccount userId={session.user.id} />;
};

export default EditAccountPage;
