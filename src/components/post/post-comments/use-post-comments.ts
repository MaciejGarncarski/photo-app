import { useInfiniteQuery } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/api-client';

import { CommentResponse } from '@/src/schemas/post-comment';

type UseInfiniteComments = {
  postId: number;
};

export const useInfiniteComments = ({ postId }: UseInfiniteComments) => {
  return useInfiniteQuery({
    queryKey: ['infinite comments', postId],
    queryFn: ({ pageParam = 0 }): Promise<CommentResponse> => {
      return apiClient({
        method: 'GET',
        url: `post-comment/${postId}?skip=${pageParam}`,
      });
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: (prevComments: CommentResponse) => {
      return prevComments.currentPage === prevComments.totalPages
        ? undefined
        : prevComments.currentPage + 1;
    },
  });
};
