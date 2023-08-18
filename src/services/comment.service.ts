import { apiClient } from '@/src/utils/api-client';

import { AddPostCommentInput } from '@/src/schemas/post-comment';

type LikeComment = { commentId: number; isLiked: boolean };

export const likeComment = ({ commentId, isLiked }: LikeComment) => {
  return apiClient({
    url: `post-comment/${commentId}/like`,
    method: isLiked ? 'DELETE' : 'PUT',
  });
};

type DeleteComment = {
  commentId: number;
};

export const deleteComment = ({ commentId }: DeleteComment) => {
  return apiClient({
    url: `post-comment/${commentId}`,
    method: 'DELETE',
  });
};

export const addComment = ({ commentText, postId }: AddPostCommentInput) => {
  return apiClient({
    url: 'post-comment',
    method: 'POST',
    body: {
      commentText,
      postId,
    },
  });
};
