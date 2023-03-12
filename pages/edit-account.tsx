import { useAuth } from '@/hooks/useAuth';

import { Loader } from '@/components/atoms/loader/Loader';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { EditAccount } from '@/components/pages/editAccount/EditAccount';

const EditAccountPage = () => {
  const { status, session } = useAuth();

  if (status === 'loading' || !session?.user?.id) {
    return <Loader variant="margin-top" />;
  }

  if (status === 'unauthenticated') {
    return <AccessDenied />;
  }

  return <EditAccount userId={session.user.id} />;
};

export default EditAccountPage;
