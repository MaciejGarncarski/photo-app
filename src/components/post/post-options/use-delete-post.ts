import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '@/src/hooks/use-auth';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-homepage-posts';
import { deletePost } from '@/src/services/posts.service';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { sessionUser } = useAuth();

  return useMutation({
    mutationFn: deletePost,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['account posts', sessionUser?.id],
      });
      await queryClient.invalidateQueries({ queryKey: HOME_POSTS_QUERY_KEY });
    },
  });
};
