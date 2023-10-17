'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { useAuth } from '@/src/hooks/use-auth';
import { nextPageParam } from '@/src/utils/api/next-page-param';

import { getChatUsers } from '@/src/services/chat.service';

export const useChatUsers = () => {
  const { sessionUser } = useAuth();

  return useInfiniteQuery({
    queryKey: ['chat users', sessionUser?.id],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await getChatUsers({
        skip: pageParam.toString(),
      });

      if (!data.data) {
        throw new Error('No data');
      }

      return data.data;
    },
    initialPageParam: 0,
    staleTime: 20000,
    refetchOnWindowFocus: false,
    getNextPageParam: nextPageParam,
  });
};
