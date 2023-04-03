import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { apiClient } from '@/src/utils/apis/apiClient';

import { PostLikeSchema } from '@/src/pages/api/post/like';

type PostLike = z.infer<typeof PostLikeSchema>;

export const usePostLike = () => {
  return useMutation(async ({ postId }: PostLike) => {
    await apiClient.post<null, null, PostLike>(`post/like`, {
      postId: postId,
    });
  });
};
