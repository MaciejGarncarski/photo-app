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

import { postSchema } from '@/src/schemas/post.schema';

export const userPostsSchema = z.object({
  postsCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  posts: z.array(postSchema),
});

export type UserPosts = z.infer<typeof userPostsSchema>;
