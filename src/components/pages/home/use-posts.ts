import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { nextPageParam } from '@/src/utils/api/next-page-param';

import { getInfinitePosts } from '@/src/services/posts.service';

export const HOME_POSTS_QUERY_KEY: QueryKey = ['homepage infinite posts'];

export const useInfinitePosts = () => {
  const query = useInfiniteQuery({
    queryKey: HOME_POSTS_QUERY_KEY,
    queryFn: getInfinitePosts,
    refetchOnWindowFocus: false,
    staleTime: 10000,
    initialPageParam: 0,
    getNextPageParam: nextPageParam,
  });

  return query;
};
