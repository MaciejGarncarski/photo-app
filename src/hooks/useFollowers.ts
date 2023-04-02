import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UserApiResponse } from '@/src/pages/api/account/[user]';

type StatsResponse = {
  users: Array<{ user: UserApiResponse; chatRoomId: number }>;
  usersCount: number;
  canLoadMore: boolean;
  nextCursor: number | null;
};

type PropsTypes = {
  userId: string;
  type: 'following' | 'followers';
};

export const useFollowers = ({ userId, type }: PropsTypes) => {
  return useInfiniteQuery(
    [type, userId],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get<StatsResponse>(
        `/api/getFollowers?userId=${userId}&type=${type}&skip=${pageParam ?? 0}`,
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
