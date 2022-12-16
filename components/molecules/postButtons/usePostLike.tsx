import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type LikePost = {
  userID: string;
  isLiked: boolean;
  postID: number;
};

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userID, postID, isLiked }: LikePost) => {
      if (isLiked) {
        const { status } = await axios.delete(`/api/post/like?user=${userID}&post=${postID}`);
        return status;
      }
      const { status } = await axios.put(`/api/post/like?user=${userID}&post=${postID}`);
      return status;
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['homepage infinite posts']);
        queryClient.invalidateQueries(['collection']);
      },
    }
  );
};
