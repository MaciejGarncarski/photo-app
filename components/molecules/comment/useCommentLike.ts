import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type CommentLike = {
  id: number;
};

export const useCommentLike = ({ id }: CommentLike) => {
  const queryClient = useQueryClient();

  return useMutation(
    async () => {
      const { status } = await axios.post(`/api/post/comment`, {
        id,
      });
      return status;
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(['infinite comments']);
      },
    }
  );
};
