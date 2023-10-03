import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '@/src/utils/api-client';

import { PostDetails } from '@/src/schemas/post.schema';

type Mutation = {
  isLiked: boolean;
  postId: number;
};

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isLiked, postId }: Mutation) => {
      return apiClient({
        url: `post/${postId}/like`,
        method: isLiked ? 'DELETE' : 'POST',
      });
    },
    onMutate: async ({ postId, isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ['post'] });

      const oldPost = queryClient.getQueryData<PostDetails>(['post', postId]);

      queryClient.setQueryData<PostDetails>(['post', postId], (post) => {
        if (!post) {
          return post;
        }

        return {
          ...post,
          isLiked: !isLiked,
          likesCount: (post?.likesCount ?? 0) + (post.isLiked ? -1 : 1),
        };
      });

      return {
        oldPost,
      };
    },
    onError: (err, newPostLike, ctx) => {
      queryClient.setQueryData<PostDetails>(
        ['post', ctx?.oldPost?.id],
        ctx?.oldPost,
      );
    },
    onSettled: (data, _, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });
};
