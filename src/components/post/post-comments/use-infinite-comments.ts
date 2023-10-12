import { useInfiniteQuery } from '@tanstack/react-query';

import { nextPageParam } from '@/src/utils/api/next-page-param';

import { getComments } from '@/src/services/comment.service';

type UseInfiniteComments = {
  postId: number;
};

export const useInfiniteComments = ({ postId }: UseInfiniteComments) => {
  return useInfiniteQuery({
    queryKey: ['infinite comments', postId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await getComments({
        postId: postId.toString(),
        skip: pageParam.toString(),
      });

      return data.data;
    },
    initialPageParam: 0,
    refetchOnWindowFocus: false,
    getNextPageParam: nextPageParam,
  });
};
