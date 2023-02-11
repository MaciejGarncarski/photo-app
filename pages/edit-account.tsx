import { useAuth } from '@/hooks/useAuth';

import { Loading } from '@/components/atoms/loading/Loading';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { EditAccount } from '@/components/pages/editAccount/EditAccount';

const EditAccountPage = () => {
  const { status, session } = useAuth();

  if (status === 'loading' || !session?.user?.id) {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    return <AccessDenied />;
  }

  return <EditAccount userId={session.user.id} />;
};

export default EditAccountPage;
