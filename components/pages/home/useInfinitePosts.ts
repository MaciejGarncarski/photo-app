import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PostData } from '@/components/pages/collection/useCollection';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

type UseInfinitePosts = {
  initialData?: InfinitePosts<PostData>;
};

export const fetchInfinitePosts = async ({ pageParam = 0 }) => {
  const { data } = await axios.get<InfinitePosts<PostData>>(`/api/post/infinitePosts?skip=${pageParam}`);
  return data;
};

export const useInfinitePosts = ({ initialData }: UseInfinitePosts) => {
  const transformedInitialData: InfiniteData<InfinitePosts<PostData> | undefined> = {
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
