import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { addComment } from '@/src/services/comment.service';

export const useAddComment = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onError: () => {
      toast.error('Cannot add comment. Try again later.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
      queryClient.invalidateQueries({
        queryKey: ['infinite comments', postId],
      });
    },
  });
};
