import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { useAccount } from '@/components/pages/account/useAccount';

export const useAuth = () => {
  const { data: session, status } = useSession();

  const sessionUserData = useAccount({ id: session?.user?.id });

  return useMemo(
    () =>
      ({
        session,
        status,
        getProviders,
        signIn,
        signOut,
        sessionUserData: sessionUserData.data,
      } as const),
    [session, sessionUserData, status],
  );
};
