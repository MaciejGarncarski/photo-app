import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { apiClient } from '@/src/utils/apis/apiClient';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/useInfinitePosts';

type DeletePostMutation = {
  postId: number;
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ postId }: DeletePostMutation) => {
      await apiClient.delete(`post?postId=${postId}`);
    },
    {
      onError: () => toast.error('Error, try again later.'),
      onSettled: async () => {
        await queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
      },
    },
  );
};
