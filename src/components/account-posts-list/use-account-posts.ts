import { useInfiniteQuery } from '@tanstack/react-query';

import { getUserPosts } from '@/src/services/posts.service';

type UseAccountPost = {
  userId: string;
};
export const useAccountPosts = ({ userId }: UseAccountPost) => {
  return useInfiniteQuery({
    queryKey: ['account posts', userId],
    queryFn: ({ pageParam }) => getUserPosts({ userId, pageParam }),
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
