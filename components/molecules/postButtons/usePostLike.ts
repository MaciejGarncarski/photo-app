import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

import { PostLikeSchema } from '@/pages/api/post/like';

type PostLike = z.infer<typeof PostLikeSchema>;

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ postId }: PostLike) => {
      await axios.post<null, null, PostLike>(`/api/post/like`, {
        postId: postId,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['collection']);
      },
    },
  );
};
