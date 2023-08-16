import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addComment } from '@/src/services/comment.service';

export const useAddComment = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({
        queryKey: ['infinite comments', postId],
      });
    },
  });
};
