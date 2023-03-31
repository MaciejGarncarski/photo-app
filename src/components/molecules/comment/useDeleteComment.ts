import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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
      onError: () => toast.error('Error, try again later.'),
      onSettled: async () => {
        await queryClient.invalidateQueries(['infinite comments']);
      },
    },
  );
};
