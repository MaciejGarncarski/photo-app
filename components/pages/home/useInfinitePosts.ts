import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PrefetchedPostData } from '@/utils/prefetchPosts';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

type UseInfinitePosts = {
  initialData?: InfinitePosts<PrefetchedPostData>;
};

export const fetchInfinitePosts = async ({ pageParam = 0 }) => {
  const { data } = await axios.get<InfinitePosts<PrefetchedPostData>>(`/api/post/infinitePosts?skip=${pageParam}`);
  return data;
};

export const useInfinitePosts = ({ initialData }: UseInfinitePosts) => {
  const transformedInitialData: InfiniteData<InfinitePosts<PrefetchedPostData> | undefined> = {
    pages: [initialData],
    pageParams: [],
  };

  return useInfiniteQuery(['homepage infinite posts'], fetchInfinitePosts, {
    refetchOnWindowFocus: false,
    initialData: transformedInitialData,
    getNextPageParam: (prevPosts) => {
      return prevPosts?.cursor ?? undefined;
    },
  });
};
