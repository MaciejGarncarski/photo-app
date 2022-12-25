import { PostComments } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

type InfiniteComments = {
  comments: Array<PostComments>;
  commentsCount: number;
  cursor: number | null;
};

type UseInfiniteComments = {
  postId: number;
};

export const useInfiniteComments = ({ postId }: UseInfiniteComments) => {
  return useInfiniteQuery(
    ['infinite comments', postId],
    async ({ pageParam = 0 }) => {
      const { data } = await axios.get<InfiniteComments>(
        `/api/post/infiniteComments?skip=${pageParam}&postId=${postId}`
      );
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
