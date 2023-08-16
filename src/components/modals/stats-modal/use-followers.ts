import { useInfiniteQuery } from '@tanstack/react-query';

import { FollowersResponse } from '@/src/schemas/follower-stats';
import { getFollowers } from '@/src/services/user.service';

type UseFollowers = {
  userId: string;
  type: 'followers' | 'friends';
};

export const useFollowers = ({ userId, type }: UseFollowers) => {
  return useInfiniteQuery({
    queryKey: [type, userId],
    queryFn: ({ pageParam }) => getFollowers({ pageParam, type, userId }),
    defaultPageParam: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: (prev: FollowersResponse) => {
      return prev.currentPage === prev.totalPages
        ? undefined
        : prev.currentPage + 1;
    },
  });
};
