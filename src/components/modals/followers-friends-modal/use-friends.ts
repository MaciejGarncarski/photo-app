import { useInfiniteQuery } from '@tanstack/react-query';

import { nextPageParam } from '@/src/utils/api/next-page-param';

import { getFriends } from '@/src/services/user.service';

type UseFriends = {
  userId: string;
  enabled: boolean;
};

export const useFriends = ({ userId, enabled }: UseFriends) => {
  return useInfiniteQuery({
    queryKey: ['friends', userId],
    queryFn: async ({ pageParam }) => {
      const { data } = await getFriends({
        skip: pageParam.toString(),
        userId,
      });

      if (!data['data']) {
        throw new Error('No data');
      }

      return data.data;
    },
    initialPageParam: 0,
    enabled,
    refetchOnWindowFocus: false,
    getNextPageParam: nextPageParam,
  });
};
