import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { useUser } from '@/src/hooks/useUser';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const isSignedIn = Boolean(session?.user?.id) && status === 'authenticated';
  const { data } = useUser({ userId: session?.user?.id || '' });

  return useMemo(() => {
    return {
      session,
      isSignedIn,
      isLoading: status === 'loading',
      isAuthenticated: status === 'authenticated',
      data,
    };
  }, [data, isSignedIn, session, status]);
};
