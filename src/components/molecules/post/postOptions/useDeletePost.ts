import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/useInfinitePosts';

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
      onError: () => toast.error('Error, try again later.'),
      onSettled: async () => {
        await queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
      },
    },
  );
};
