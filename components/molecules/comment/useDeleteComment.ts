import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type DeleteCommentMutation = {
  id: number;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id }: DeleteCommentMutation) => {
      await axios.delete(`/api/post/comment?commentId=${id}`);
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['infinite comments']);
      },
    }
  );
};
