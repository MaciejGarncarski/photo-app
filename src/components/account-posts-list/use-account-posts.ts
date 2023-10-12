import { useInfiniteQuery } from '@tanstack/react-query';

import { nextPageParam } from '@/src/utils/api/next-page-param';

import { getUserPosts } from '@/src/services/posts.service';

type UseAccountPost = {
  userId: string;
};

export const useAccountPosts = ({ userId }: UseAccountPost) => {
  return useInfiniteQuery({
    queryKey: ['account posts', userId],
    queryFn: async ({ pageParam }) => {
      const { data } = await getUserPosts({
        authorId: userId,
        skip: pageParam,
      });

      if (!data) {
        throw new Error('Fetch failed');
      }

      return data;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    enabled: userId !== '',
    staleTime: 20000,
    getNextPageParam: nextPageParam,
  });
};
