import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { apiClient } from '@/src/utils/apis/apiClient';

type Mutation = { commentId: number; isLiked: boolean };

export const useCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ commentId, isLiked }: Mutation) => {
      if (isLiked) {
        return apiClient.delete(`post-comment/${commentId}/like`);
      }

      return apiClient.put(`post-comment/${commentId}/like`);
    },
    {
      onError: () => toast.error('Error, try again later.'),
      onSettled: async () => {
        await queryClient.invalidateQueries(['infinite comments']);
      },
    },
  );
};
