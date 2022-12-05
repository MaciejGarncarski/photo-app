import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { useMemo } from 'react';

export const useAuth = () => {
  const { data: session, status } = useSession();

  return useMemo(
    () =>
      ({
        session,
        status,
        getProviders,
        signIn,
        signOut,
      } as const),
    [session, status]
  );
};
