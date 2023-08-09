import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-posts';
import { deletePost } from '@/src/services/posts.service';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSettled: async () => {
      await queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
    },
  });
};
