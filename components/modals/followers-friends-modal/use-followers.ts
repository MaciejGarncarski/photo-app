import { useInfiniteQuery } from '@tanstack/react-query';

import { nextPageParam } from '@/utils/api/next-page-param';

import { getFollowers } from '@/services/user.service';

type UseFollowers = {
  userId: string;
  enabled: boolean;
};

export const useFollowers = ({ userId, enabled }: UseFollowers) => {
  return useInfiniteQuery({
    queryKey: ['followers', userId],
    queryFn: async ({ pageParam }) => {
      const { data } = await getFollowers({
        skip: pageParam.toString(),
        userId,
      });

      if (!data['data']) {
        throw new Error('NO data');
      }

      return data.data;
    },
    initialPageParam: 0,
    enabled,
    refetchOnWindowFocus: false,
    getNextPageParam: nextPageParam,
  });
};
