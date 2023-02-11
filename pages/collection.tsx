import { useAuth } from '@/hooks/useAuth';

import { Loading } from '@/components/atoms/loading/Loading';
import { AccessDenied } from '@/components/molecules/accessDenied/AccessDenied';
import { Collection } from '@/components/pages/collection/Collection';

const CollectionPage = () => {
  const { status } = useAuth();

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    return <AccessDenied />;
  }

  return <Collection />;
};

export default CollectionPage;
