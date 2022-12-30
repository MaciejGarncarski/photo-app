import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { CommentId } from '@/components/molecules/comment/useCommentLike';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ commentId }: CommentId) => {
      await axios.delete(`/api/post/comment?commentId=${commentId}`);
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['infinite comments']);
      },
    }
  );
};
