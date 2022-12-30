import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type Mutation = {
  commentId: number;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ commentId }: Mutation) => {
      await axios.delete(`/api/post/comment?commentId=${commentId}`);
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['infinite comments']);
      },
    }
  );
};
