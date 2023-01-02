import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PostData } from '@/components/pages/collection/useCollection';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

export const useInfinitePosts = () => {
  return useInfiniteQuery(
    ['homepage infinite posts'],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get<InfinitePosts<PostData>>(`/api/post/infinitePosts?skip=${pageParam}`);
      return data;
    },

    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevPosts) => {
        return prevPosts.cursor ?? undefined;
      },
    },
  );
};
