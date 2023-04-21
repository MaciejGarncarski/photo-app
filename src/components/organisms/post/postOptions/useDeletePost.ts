import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { clientEnv } from '@/src/utils/env';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/useInfinitePosts';

type DeletePostMutation = {
  postId: number;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ postId }: DeletePostMutation) => {
      await axios.delete(`${clientEnv.NEXT_PUBLIC_API_ROOT}api/post/${postId}`, { withCredentials: true });
    },
    {
      onError: () => toast.error('Error, try again later.'),
      onSettled: async () => {
        await queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
      },
    },
  );
};
