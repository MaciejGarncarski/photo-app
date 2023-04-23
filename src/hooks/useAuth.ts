import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { getSessionUser } from '@/src/services/user.service';

export const useAuth = () => {
  const { data: sessionUser, isLoading } = useQuery(['session'], getSessionUser);

  const isSignedIn = Boolean(sessionUser?.id) && !isLoading;

  return useMemo(() => {
    return {
      sessionUser,
      isSignedIn,
      isLoading,
    };
  }, [isLoading, isSignedIn, sessionUser]);
};
