import { useMutation, useQueryClient } from '@tanstack/react-query';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/use-posts';
import { addComment } from '@/src/services/comment.service';

export const useAddComment = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation(addComment, {
    onSettled: () => {
      queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
      queryClient.invalidateQueries(['post', postId]);
      queryClient.invalidateQueries(['infinite comments', postId]);
    },
  });
};
