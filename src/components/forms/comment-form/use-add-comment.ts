import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { addComment } from '@/src/services/comment.service';

export const COMMENT_MUTATION_KEY = ['comment mutation'] as const;

export type CommentMutationVariables = {
  commentText: string;
  postId: string;
};

export const useAddComment = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: COMMENT_MUTATION_KEY,
    mutationFn: async (variables: CommentMutationVariables) => {
      const { data } = await addComment(variables);
      return data;
    },
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
