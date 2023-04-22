import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { apiClient } from '@/src/utils/apis/apiClient';

import { User } from '@/src/schemas/user.schema';

export const useAuth = () => {
  const { data: sessionUser, isLoading } = useQuery(['session'], async () => {
    const { data } = await apiClient.get<User>('auth/me');
    return data;
  });

  const isSignedIn = Boolean(sessionUser?.id) && !isLoading;

  return useMemo(() => {
    return {
      sessionUser,
      isSignedIn,
      isLoading,
    };
  }, [isLoading, isSignedIn, sessionUser]);
};
