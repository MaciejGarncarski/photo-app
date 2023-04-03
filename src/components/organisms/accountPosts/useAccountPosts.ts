import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';
import { PostData } from '@/src/utils/apis/transformPost';

type FetchPost = {
  pageParam?: number;
  userId: string;
};

type UseAccountPost = {
  userId: string;
};

type InfiniteAccountPosts = {
  posts: Array<PostData>;
  postsCount: number;
  currentPage: number;
  totalPages: number;
};

const fetchPosts = async ({ pageParam = 0, userId }: FetchPost) => {
  const { data } = await apiClient.get<InfiniteAccountPosts>(
    `account/infinitePosts?userId=${userId}&currentPage=${pageParam}`,
  );
  return data;
};

export const useAccountPosts = ({ userId }: UseAccountPost) => {
  return useInfiniteQuery(['account posts', userId], ({ pageParam }) => fetchPosts({ userId, pageParam }), {
    refetchOnWindowFocus: false,
    getNextPageParam: (prevPosts) => {
      return prevPosts.currentPage === prevPosts.totalPages ? undefined : prevPosts.currentPage + 1;
    },
  });
};
