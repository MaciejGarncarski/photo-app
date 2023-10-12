import { useInfiniteQuery } from '@tanstack/react-query';

import { nextPageParam } from '@/src/utils/api/next-page-param';

import { getFollowers } from '@/src/services/user.service';

type UseFollowers = {
  userId: string;
};

export const useFollowers = ({ userId }: UseFollowers) => {
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
    refetchOnWindowFocus: false,
    getNextPageParam: nextPageParam,
  });
};
