import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { CommentPostRequestSchema } from '@/pages/api/post/comment';

type Mutation = z.infer<typeof CommentPostRequestSchema>;

export const useCommentLike = ({ commentId }: Mutation) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      try {
        await axios.post<unknown, null, Mutation>(`/api/post/comment`, {
          commentId,
        });
      } catch (error) {
        toast.error('Error, try again later.');
      }
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['infinite comments']);
      },
    },
  );
};
