import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { useUser } from '@/components/pages/account/useUser';

export const useAuth = () => {
  const { data: session, status } = useSession();

  const sessionUserData = useUser({ userId: session?.user?.id });
  const isSignedIn = Boolean(session?.user?.id && status === 'authenticated');

  return useMemo(
    () =>
      ({
        session,
        status,
        getProviders,
        signIn,
        signOut,
        isSignedIn,
        sessionUserData: sessionUserData,
      } as const),
    [isSignedIn, session, sessionUserData, status],
  );
};
