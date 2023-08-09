import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { likeComment } from '@/src/services/comment.service';

export const useCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation(likeComment, {
    onError: () => toast.error('Error, try again later.'),
    onSettled: async () => {
      await queryClient.invalidateQueries(['infinite comments']);
    },
  });
};
