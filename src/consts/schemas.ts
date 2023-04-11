import { z } from 'zod';

import { PostImage } from '@/src/pages/api/post/postImage';

export const userSchema = z.object({
  username: z.string(),
  name: z.string().nullable(),
  id: z.string(),
  image: z.string().nullable(),
  bio: z.string().nullable(),
  customImage: z.string().nullable(),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userApiResponseSchema = userSchema.extend({
  postsCount: z.number(),
  followersCount: z.number(),
  friendsCount: z.number(),
  isFollowing: z.boolean(),
});

export type UserApiResponse = z.infer<typeof userApiResponseSchema>;

export const postSchema = z.object({
  authorId: z.string(),
  author: z.custom<User>(),
  likesCount: z.number(),
  commentsCount: z.number(),
  createdAt: z.string(),
  description: z.string(),
  imagesData: z.custom<Array<PostImage>>(),
  postId: z.number(),
  isLiked: z.boolean(),
});

export type Post = z.infer<typeof postSchema>;
