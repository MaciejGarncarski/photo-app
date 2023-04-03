import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';
import { PostData } from '@/src/utils/apis/transformPost';

import { InfinitePosts } from '@/src/pages/api/post/infinitePosts';

export const HOME_POSTS_QUERY_KEY: QueryKey = ['homepage infinite posts'];

export const fetchInfinitePosts = async ({ pageParam = 0 }) => {
  const { data } = await apiClient.get<InfinitePosts<PostData>>(`post/infinitePosts?skip=${pageParam}`);
  return data;
};

export const useInfinitePosts = () => {
  return useInfiniteQuery(HOME_POSTS_QUERY_KEY, fetchInfinitePosts, {
    refetchOnWindowFocus: false,
    getNextPageParam: (prevPosts) => {
      return prevPosts?.cursor ?? undefined;
    },
  });
};
