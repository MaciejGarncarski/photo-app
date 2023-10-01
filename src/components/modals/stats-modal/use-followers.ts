import { useInfiniteQuery } from '@tanstack/react-query';

import { nextPageParam } from '@/src/utils/api/next-page-param';

import { getFollowers } from '@/src/services/user.service';

type UseFollowers = {
  userId: string;
  type: 'followers' | 'friends';
};

export const useFollowers = ({ userId, type }: UseFollowers) => {
  return useInfiniteQuery({
    queryKey: [type, userId],
    queryFn: ({ pageParam }) => getFollowers({ pageParam, type, userId }),
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: nextPageParam,
  });
};
