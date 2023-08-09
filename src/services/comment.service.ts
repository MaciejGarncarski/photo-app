import { apiClient } from '@/src/utils/api-client';

import { AddPostCommentInput } from '@/src/schemas/post-comment';

type LikeComment = { commentId: number; isLiked: boolean };

export const likeComment = ({ commentId, isLiked }: LikeComment) => {
  if (isLiked) {
    return apiClient.delete(`post-comment/${commentId}/like`);
  }

  return apiClient.put(`post-comment/${commentId}/like`);
};

type DeleteComment = {
  commentId: number;
};

export const deleteComment = ({ commentId }: DeleteComment) => {
  return apiClient.delete(`post-comment/${commentId}`);
};

export const addComment = ({ commentText, postId }: AddPostCommentInput) => {
  return apiClient.post<unknown, null, AddPostCommentInput>('post-comment', {
    commentText,
    postId,
  });
};
