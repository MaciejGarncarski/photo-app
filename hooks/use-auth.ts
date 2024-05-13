import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getSessionUser } from '@/services/auth.service';

export const useAuth = () => {
  const {
    data: sessionUser,
    isPending,
    isRefetching,
    isFetching,
  } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      try {
        const { data: sessionUser } = await getSessionUser({});

        if (!sessionUser['data']) {
          throw new Error('No session data');
        }

        return sessionUser['data'];
      } catch (error) {
        return null;
      }
    },
    initialData: undefined,
    staleTime: 10000,
    retry: false,
  });

  const isSignedIn = Boolean(sessionUser?.id);

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
