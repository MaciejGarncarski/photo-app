import { fetcher } from '@/utils/api/api-client';

export const getPost = fetcher.path('/posts/{postId}').method('get').create();

export const deletePost = fetcher
  .path('/posts/{postId}')
  .method('delete')
  .create();

export const getInfinitePosts = fetcher.path('/posts').method('get').create();

export const getUserPosts = fetcher
  .path('/posts/user/{authorId}')
  .method('get')
  .create();

export const editPost = fetcher
  .path('/posts/{postId}/edit')
  .method('put')
  .create();

export const likePost = fetcher
  .path('/posts/{postId}/like')
  .method('post')
  .create();

export const unlikePost = fetcher
  .path('/posts/{postId}/like')
  .method('delete')
  .create();
