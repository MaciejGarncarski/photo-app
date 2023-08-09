import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apiClient';

import { CommentResponse } from '@/src/schemas/post-comment';

type UseInfiniteComments = {
  postId: number;
};

export const useInfiniteComments = ({ postId }: UseInfiniteComments) => {
  return useInfiniteQuery(
    ['infinite comments', postId],
    async ({ pageParam = 0 }) => {
      const { data } = await apiClient.get<CommentResponse>(
        `post-comment/${postId}?skip=${pageParam}`,
      );
      return data;
    },

    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevComments) => {
        return prevComments.currentPage === prevComments.totalPages
          ? undefined
          : prevComments.currentPage + 1;
      },
    },
  );
};
