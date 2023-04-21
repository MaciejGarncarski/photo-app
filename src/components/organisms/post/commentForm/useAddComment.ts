import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/apis/apiClient';

import { HOME_POSTS_QUERY_KEY } from '@/src/components/pages/home/useInfinitePosts';
import { AddPostCommentInput } from '@/src/schemas/post-comment';

export const useAddComment = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ commentText, postId }: AddPostCommentInput) => {
      await apiClient.post<unknown, null, AddPostCommentInput>('post-comment', {
        commentText,
        postId,
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
        queryClient.invalidateQueries(['post', postId]);
        queryClient.invalidateQueries(['infinite comments', postId]);
      },
    },
  );
};
