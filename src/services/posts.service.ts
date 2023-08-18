import { apiClient } from '@/src/utils/api-client';

import {
  postDetailsSchema,
  postsResponseSchema,
} from '@/src/schemas/post.schema';

type GetPost = {
  postId: number;
};

export const getPost = async ({ postId }: GetPost) => {
  const data = apiClient({
    url: `post/${postId}`,
    method: 'GET',
    schema: postDetailsSchema,
  });
  return data;
};

export const getInfinitePosts = async ({ pageParam = 0 }) => {
  const data = await apiClient({
    url: `post/homepage-posts?skip=${pageParam}`,
    method: 'GET',
    schema: postsResponseSchema,
  });

  return data;
};

type DeletePost = {
  postId: number;
};

export const deletePost = ({ postId }: DeletePost) => {
  return apiClient({
    url: `post/${postId}`,
    method: 'DELETE',
  });
};
