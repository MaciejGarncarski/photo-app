import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/api-client';

import { userPostsSchema } from '@/src/services/userPosts.service';

type FetchPost = {
  pageParam: number;
  userId: string;
};

const fetchPosts = async ({ pageParam, userId }: FetchPost) => {
  const data = await apiClient({
    url: `users/posts/${userId}?skip=${pageParam}`,
    method: 'GET',
    schema: userPostsSchema,
  });
  return data;
};

type UseAccountPost = {
  userId: string;
};
export const useAccountPosts = ({ userId }: UseAccountPost) => {
  return useInfiniteQuery({
    queryKey: ['account posts', userId],
    queryFn: ({ pageParam }) => fetchPosts({ userId, pageParam }),
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    enabled: userId !== '',
    getNextPageParam: (prevPosts) => {
      return prevPosts.currentPage === prevPosts.totalPages
        ? undefined
        : prevPosts.currentPage + 1;
    },
  });
};
