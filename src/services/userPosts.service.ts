export type PostImage = {
  id: number;
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  size: number;
  postId: number | null;
};

import { z } from 'zod';

const postSchema = z.object({
  commentsCount: z.number(),
  likesCount: z.number(),
  images: z.array(z.custom<PostImage>()),
  createdAt: z.date(),
  description: z.string(),
  id: z.number(),
  isLiked: z.boolean(),
});

export type Post = z.infer<typeof postSchema>;

const userSchema = z.object({
  username: z.string(),
  name: z.string().nullable(),
  id: z.string(),
  image: z.string().url().nullable(),
  customImage: z.string().url().nullable(),
  bio: z.string().nullable(),
  createdAt: z.string(),
  postsCount: z.number(),
  followersCount: z.number(),
  friendsCount: z.number(),
  isFollowing: z.boolean(),
});

const userPostsSchema = z.object({
  author: userSchema,
  postsCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  posts: z.array(postSchema),
});

export type UserPosts = z.infer<typeof userPostsSchema>;
