import { useInfiniteQuery } from '@tanstack/react-query';

import { nextPageParam } from '@/src/utils/api/next-page-param';

import { getFriends } from '@/src/services/user.service';

type UseFriends = {
  userId: string;
};

export const useFriends = ({ userId }: UseFriends) => {
  return useInfiniteQuery({
    queryKey: ['followers', userId],
    queryFn: async ({ pageParam }) => {
      const { data } = await getFriends({
        skip: pageParam.toString(),
        userId,
      });

      if (!data['data']) {
        throw new Error('NO data');
      }

      return data.data;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: nextPageParam,
  });
};
