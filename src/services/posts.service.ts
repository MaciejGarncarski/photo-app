import { apiClient } from '@/src/utils/api-client';

import {
  postDetailsSchema,
  postsResponseSchema,
} from '@/src/schemas/post.schema';
import { userPostsSchema } from '@/src/services/userPosts.service';

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

export type FetchPost = {
  pageParam: number;
  userId: string;
};

export const getUserPosts = async ({ pageParam, userId }: FetchPost) => {
  const data = await apiClient({
    url: `post/user/${userId}?skip=${pageParam}`,
    method: 'GET',
    schema: userPostsSchema,
  });
  return data;
};
