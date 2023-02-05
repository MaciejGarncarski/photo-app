import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

import { PostLikeSchema } from '@/pages/api/post/like';

type LikePost = {
  userId: string;
  isLiked: boolean;
  postId: number;
};

type PostLike = z.infer<typeof PostLikeSchema>;

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userId, postId, isLiked }: LikePost) => {
      if (isLiked) {
        const { status } = await axios.delete(`/api/post/like?userId=${userId}&postId=${postId}`);
        return status;
      }
      await axios.put<null, null, PostLike>(`/api/post/like`, {
        userId,
        postId: postId.toString(),
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['homepage infinite posts']);
        queryClient.invalidateQueries(['collection']);
      },
    },
  );
};
