import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';

import { getSessionUser } from '@/src/services/auth.service';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const {
    data: sessionUser,
    isPending,
    isRefetching,
    isFetching,
    error,
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

  useEffect(() => {
    if (error) {
      queryClient.setQueryData(['session'], () => null);
    }
  }, [error, queryClient]);

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
