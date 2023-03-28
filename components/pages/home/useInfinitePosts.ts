import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PostData } from '@/utils/apis/transformPost';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

export const HOME_POSTS_QUERY_KEY: QueryKey = ['homepage infinite posts'];

export const fetchInfinitePosts = async ({ pageParam = 0 }) => {
  const { data } = await axios.get<InfinitePosts<PostData>>(`/api/post/infinitePosts?skip=${pageParam}`);
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
