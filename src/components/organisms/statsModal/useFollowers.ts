import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

import { UserApiResponse } from '@/src/consts/schemas';

type StatsResponse = {
  users: Array<{ user: UserApiResponse; chatRoomId: number }>;
  usersCount: number;
  canLoadMore: boolean;
  nextCursor: number | null;
};

type PropsTypes = {
  userId: string;
  type: 'friends' | 'followers';
};

export const useFollowers = ({ userId, type }: PropsTypes) => {
  return useInfiniteQuery(
    [type, userId],
    async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<StatsResponse>(
        `getFollowers?userId=${userId}&type=${type}&skip=${pageParam ?? 0}`,
      );
      return data;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevPosts) => {
        return prevPosts?.nextCursor ?? undefined;
      },
    },
  );
};
