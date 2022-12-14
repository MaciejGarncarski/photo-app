import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

import { CommentPostRequestSchema } from '@/pages/api/post/comment';

type Mutation = z.infer<typeof CommentPostRequestSchema>;

export const useCommentLike = ({ commentId }: Mutation) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      await axios.post<null, null, Mutation>(`/api/post/comment`, {
        commentId,
      });
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['infinite comments']);
      },
    },
  );
};
