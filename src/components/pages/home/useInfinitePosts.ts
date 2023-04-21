import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

import { PostsResponse } from '@/src/schemas/post.schema';

export const HOME_POSTS_QUERY_KEY: QueryKey = ['homepage infinite posts'];

export const fetchInfinitePosts = async ({ pageParam = 0 }) => {
  const { data } = await apiClient.get<PostsResponse>(`post/homepage-posts?skip=${pageParam}`);
  return data;
};

export const useInfinitePosts = () => {
  return useInfiniteQuery(HOME_POSTS_QUERY_KEY, fetchInfinitePosts, {
    refetchOnWindowFocus: false,
    getNextPageParam: (prevPosts) => {
      return prevPosts.currentPage === prevPosts.totalPages ? undefined : prevPosts.currentPage + 1;
    },
  });
};
