import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

export type PostComment = {
  id: number;
  userId: string;
  postId: number;
  createdAt: Date;
  commentText: string;
  isLiked: boolean;
  likesCount: number;
};

type InfiniteComments = {
  comments: Array<PostComment>;
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
        `/api/post/infiniteComments?skip=${pageParam}&postId=${postId}`,
      );
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
