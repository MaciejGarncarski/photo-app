import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

import { PostData } from '@/utils/apis/transformPost';
import { clientEnv } from '@/utils/env';

type FetchPost = {
  pageParam?: number;
  isPrefetching?: boolean;
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

const fetchPosts = async ({ pageParam = 0, isPrefetching = false, userId }: FetchPost) => {
  const { data } = await axios.get<InfiniteAccountPosts>(
    `${
      isPrefetching ? clientEnv.NEXT_PUBLIC_API_ROOT : ''
    }/api/account/infinitePosts?userId=${userId}&currentPage=${pageParam}`,
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
