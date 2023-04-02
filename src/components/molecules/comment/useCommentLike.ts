import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { CommentPostRequestSchema } from '@/src/pages/api/post/comment';

type Mutation = z.infer<typeof CommentPostRequestSchema>;

export const useCommentLike = ({ commentId }: Mutation) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      await axios.post(`/api/post/comment`, {
        commentId,
      });
    },
    {
      onError: () => toast.error('Error, try again later.'),
      onSettled: async () => {
        await queryClient.invalidateQueries(['infinite comments']);
      },
    },
  );
};
