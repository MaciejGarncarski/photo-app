import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { clientEnv } from '@/utils/env.mjs';

import { PostData } from '@/components/pages/collection/useCollection';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

export const fetchInfinitePosts = async ({ pageParam = 0, isPrefetching = false }) => {
  const { data } = await axios.get<InfinitePosts<PostData>>(
    `${isPrefetching ? clientEnv.NEXT_PUBLIC_API_ROOT : ''}/api/post/infinitePosts?skip=${pageParam}`,
  );
  return data;
};

export const useInfinitePosts = () => {
  return useInfiniteQuery(['homepage infinite posts'], fetchInfinitePosts, {
    refetchOnWindowFocus: false,
    getNextPageParam: (prevPosts) => {
      return prevPosts?.cursor ?? undefined;
    },
  });
};
