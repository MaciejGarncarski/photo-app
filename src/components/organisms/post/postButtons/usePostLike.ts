import { useMutation } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

type Mutation = {
  isLiked: boolean;
  postId: number;
};

export const usePostLike = () => {
  return useMutation({
    mutationFn: ({ isLiked, postId }: Mutation) => {
      if (isLiked) {
        return apiClient.delete(`post/like/${postId}`);
      }
      return apiClient.post(`post/like/${postId}`);
    },
  });
};
