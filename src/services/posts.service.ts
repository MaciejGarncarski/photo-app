import { apiClient } from '@/src/utils/api-client';

import { Post, PostsResponse } from '@/src/schemas/post.schema';

type GetPost = {
  postId: number;
};

export const getPost = async ({ postId }: GetPost) => {
  const { data } = await apiClient.get<Post>(`post/${postId}`);
  return data;
};

export const getInfinitePosts = async ({ pageParam = 0 }) => {
  const { data } = await apiClient.get<PostsResponse>(
    `post/homepage-posts?skip=${pageParam}`,
  );
  return data;
};

type DeletePost = {
  postId: number;
};

export const deletePost = ({ postId }: DeletePost) => {
  return apiClient.delete(`post/${postId}`);
};
