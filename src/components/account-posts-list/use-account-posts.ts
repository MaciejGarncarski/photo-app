import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/api-client';

import { UserPosts, userPostsSchema } from '@/src/services/userPosts.service';

type FetchPost = {
  pageParam?: number;
  userId: string;
};

type UseAccountPost = {
  userId: string;
};

const fetchPosts = async ({ pageParam = 0, userId }: FetchPost) => {
  const data = await apiClient({
    url: `users/posts/${userId}?skip=${pageParam}`,
    method: 'GET',
    schema: userPostsSchema,
  });
  return data;
};

export const useAccountPosts = ({ userId }: UseAccountPost) => {
  return useInfiniteQuery({
    queryKey: ['account posts', userId],
    queryFn: ({ pageParam }) => fetchPosts({ userId, pageParam }),
    defaultPageParam: 0,
    refetchOnWindowFocus: false,
    enabled: userId !== '',
    getNextPageParam: (prevPosts: UserPosts) => {
      return prevPosts.currentPage === prevPosts.totalPages
        ? undefined
        : prevPosts.currentPage + 1;
    },
  });
};
