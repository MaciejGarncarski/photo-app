import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { getInfinitePosts } from '@/src/services/posts.service';

export const HOME_POSTS_QUERY_KEY: QueryKey = ['homepage infinite posts'];

export const useInfinitePosts = () => {
  return useInfiniteQuery(HOME_POSTS_QUERY_KEY, getInfinitePosts, {
    refetchOnWindowFocus: false,
    getNextPageParam: (prevPosts) => {
      return prevPosts.currentPage === prevPosts.totalPages ? undefined : prevPosts.currentPage + 1;
    },
  });
};
