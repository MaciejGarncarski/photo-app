import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { PostDetails } from '@/schemas/post.schema';
import { likePost, unlikePost } from '@/services/posts.service';

type Mutation = {
  isLiked: boolean;
  postId: number;
};

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ isLiked, postId }: Mutation) => {
      if (isLiked) {
        return unlikePost({ postId: postId.toString() });
      }

      return likePost({ postId: postId.toString() });
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
      toast.error('Cannot like post. Try again later.');
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
