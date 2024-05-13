import { fetcher } from '@/utils/api/api-client';

export const getComments = fetcher
  .path('/post/{postId}/comments')
  .method('get')
  .create();

export const likeComment = fetcher
  .path('/post/comment/{commentId}/like')
  .method('post')
  .create();

export const unlikeComment = fetcher
  .path('/post/comment/{commentId}/like')
  .method('delete')
  .create();

export const deleteComment = fetcher
  .path('/post/comment/{commentId}')
  .method('delete')
  .create();

export const addComment = fetcher.path('/post/comment').method('post').create();
