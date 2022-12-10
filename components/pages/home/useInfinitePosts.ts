import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { InfinitePost } from '@/pages/api/post/infinitePosts';

export const useInfinitePosts = () => {
  return useInfiniteQuery(
    ['homepage infinite posts'],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get<InfinitePost>(`/api/post/infinitePosts?skip=${pageParam}`);
      return data;
    },

    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevPosts) => {
        return prevPosts.cursor ?? undefined;
      },
    }
  );
};
