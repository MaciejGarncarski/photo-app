import { z } from 'zod';

import { PostImage } from '@/src/services/userPosts.service';

export const postSchema = z.object({
  commentsCount: z.number(),
  likesCount: z.number(),
  images: z.array(z.custom<PostImage>()),
  createdAt: z.date(),
  description: z.string(),
  id: z.number(),
  isLiked: z.boolean(),
  authorId: z.string(),
});

export const postsResponseSchema = z.object({
  postsCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  posts: z.array(postSchema),
});

export type Post = z.infer<typeof postSchema>;
export type PostsResponse = z.infer<typeof postsResponseSchema>;

export type CreatePostInput = {
  description: string;
  images: Array<Blob | null>;
};