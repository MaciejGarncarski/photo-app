import { useInfiniteQuery } from '@tanstack/react-query';

import { getFollowers } from '@/src/services/user.service';

type UseFollowers = {
  userId: string;
  type: 'followers' | 'friends';
};

export const useFollowers = ({ userId, type }: UseFollowers) => {
  return useInfiniteQuery([type, userId], ({ pageParam }) => getFollowers({ pageParam, type, userId }), {
    refetchOnWindowFocus: false,
    getNextPageParam: (prev) => {
      return prev.currentPage === prev.totalPages ? undefined : prev.currentPage + 1;
    },
  });
};
