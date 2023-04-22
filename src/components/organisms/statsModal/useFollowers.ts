import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

import { FollowersResponse } from '@/src/schemas/follower-stats';

type UseFollowers = {
  userId: string;
  type: 'followers' | 'friends';
};

export const useFollowers = ({ userId, type }: UseFollowers) => {
  return useInfiniteQuery(
    [type, userId],
    async ({ pageParam = 0 }) => {
      if (type === 'friends') {
        const { data } = await apiClient.get<FollowersResponse>(
          `follower-stats/friend?userId=${userId}&skip=${pageParam ?? 0}`,
        );
        return data;
      }

      const { data } = await apiClient.get<FollowersResponse>(
        `follower-stats/follower?userId=${userId}&skip=${pageParam ?? 0}`,
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prev) => {
        return prev.currentPage === prev.totalPages ? undefined : prev.currentPage + 1;
      },
    },
  );
};
