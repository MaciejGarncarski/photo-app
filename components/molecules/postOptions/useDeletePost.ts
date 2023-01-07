import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type DeletePostMutation = {
  postId: number;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ postId }: DeletePostMutation) => {
      await axios.delete(`/api/post?postId=${postId}`);
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['homepage infinite posts']);
      },
    },
  );
};
