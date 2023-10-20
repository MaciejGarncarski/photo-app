import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getSessionUser } from '@/src/services/auth.service';

export const useAuth = () => {
  const {
    data: sessionUser,
    isPending,
    isRefetching,
    isFetching,
  } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: sessionUser } = await getSessionUser({});

      if (!sessionUser['data']) {
        throw new Error('No session data');
      }

      return sessionUser['data'];
    },
    initialData: null,
    retry: false,
  });

  const isSignedIn = Boolean(sessionUser?.id) && !isPending;

  return useMemo(() => {
    return {
      sessionUser,
      isSignedIn,
      isPending,
      isRefetching,
      isFetching,
    };
  }, [isFetching, isPending, isRefetching, isSignedIn, sessionUser]);
};
