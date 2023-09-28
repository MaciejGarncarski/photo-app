import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { getInfinitePosts } from '@/src/services/posts.service';

export const HOME_POSTS_QUERY_KEY: QueryKey = ['homepage infinite posts'];

export const useInfinitePosts = () => {
  const query = useInfiniteQuery({
    queryKey: HOME_POSTS_QUERY_KEY,
    queryFn: getInfinitePosts,
    refetchOnWindowFocus: false,
    staleTime: 10000,
    getNextPageParam: (prevPosts) => {
      if (!prevPosts) {
        return undefined;
      }

      return prevPosts.currentPage === prevPosts.totalPages
        ? undefined
        : prevPosts.currentPage + 1;
    },
    initialPageParam: 0,
  });

  return query;
};
