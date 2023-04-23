import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/useInfinitePosts';
import { deletePost } from '@/src/services/posts.service';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onError: () => toast.error('Error, try again later.'),
    onSettled: async () => {
      await queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
    },
  });
};
