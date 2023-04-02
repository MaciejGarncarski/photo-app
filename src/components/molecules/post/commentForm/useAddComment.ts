import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/useInfinitePosts';

import { CommentPutRequestSchema } from '@/src/pages/api/post/comment';

type PutCommentRequest = z.infer<typeof CommentPutRequestSchema>;

export const useAddComment = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ commentText, postId }: PutCommentRequest) => {
      await axios.put<unknown, null, PutCommentRequest>('/api/post/comment', {
        commentText,
        postId,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
        queryClient.invalidateQueries(['post', postId]);
        queryClient.invalidateQueries(['infinite comments', postId]);
      },
    },
  );
};
