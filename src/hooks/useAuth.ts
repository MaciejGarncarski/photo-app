import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';

import { clientEnv } from '@/src/utils/env';

import { User } from '@/src/schemas/user.schema';

export const useAuth = () => {
  const { data: sessionUser, isLoading } = useQuery(
    ['session'],
    async () => {
      const { data } = await axios.get<User>(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/auth/me`, {
        withCredentials: true,
      });
      return data;
    },
    { retry: 1 },
  );

  const isSignedIn = Boolean(sessionUser?.id) && !isLoading;

  return useMemo(() => {
    return {
      sessionUser,
      isSignedIn,
      isLoading,
    };
  }, [isLoading, isSignedIn, sessionUser]);
};
