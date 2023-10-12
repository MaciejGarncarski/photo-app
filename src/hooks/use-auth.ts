import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getSessionUser } from '@/src/services/auth.service';

export const useAuth = () => {
  const {
    data: sessionUser,
    isLoading,
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

  const isSignedIn = Boolean(sessionUser?.id) && !isLoading;

  return useMemo(() => {
    return {
      sessionUser,
      isSignedIn,
      isLoading,
      isRefetching,
      isFetching,
    };
  }, [isFetching, isLoading, isRefetching, isSignedIn, sessionUser]);
};
