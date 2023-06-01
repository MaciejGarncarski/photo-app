import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apiClient';

import { UserPosts } from '@/src/services/userPosts.service';

type FetchPost = {
  pageParam?: number;
  userId: string;
};

type UseAccountPost = {
  userId: string;
};

const fetchPosts = async ({ pageParam = 0, userId }: FetchPost) => {
  const { data } = await apiClient.get<UserPosts>(
    `users/posts/${userId}?skip=${pageParam}`,
  );
  return data;
};

export const useAccountPosts = ({ userId }: UseAccountPost) => {
  return useInfiniteQuery(
    ['account posts', userId],
    ({ pageParam }) => fetchPosts({ userId, pageParam }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevPosts) => {
        return prevPosts.currentPage === prevPosts.totalPages
          ? undefined
          : prevPosts.currentPage + 1;
      },
    },
  );
};
