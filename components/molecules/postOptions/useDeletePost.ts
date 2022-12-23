import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type DeletePostMutation = {
  postID: number;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ postID }: DeletePostMutation) => {
      await axios.delete(`/api/post?postID=${postID}`);
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['homepage infinite posts']);
      },
    }
  );
};
