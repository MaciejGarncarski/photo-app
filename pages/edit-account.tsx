import { useAuth } from '@/hooks/useAuth';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { EditAccount } from '@/components/pages/editAccount/EditAccount';

const EditAccountPage = () => {
  const { isLoading, isAuthenticated, session } = useAuth();

  if (isLoading || !session?.user?.id) {
    return <Loader variant="margin-top" />;
  }

  if (!isAuthenticated) {
    return <AccessDenied />;
  }

  return <EditAccount userId={session.user.id} />;
};

export default EditAccountPage;
