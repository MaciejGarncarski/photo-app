import { z } from 'zod';

const addPostCommentInputSchema = z.object({
  commentText: z.string(),
  postId: z.number(),
});

export type AddPostCommentInput = z.infer<typeof addPostCommentInputSchema>;

const getPostCommentsInputSchema = z.object({
  postId: z.string(),
});

const getPostCommentsQuerySchema = z.object({
  skip: z.string(),
});

export type GetPostCommentsInput = z.infer<typeof getPostCommentsInputSchema>;
export type GetPostCommentsQuery = z.infer<typeof getPostCommentsQuerySchema>;

const commentSchema = z.object({
  commentText: z.string(),
  createdAt: z.date(),
  likesCount: z.number(),
  isLiked: z.boolean(),
  postId: z.number(),
  commentId: z.number(),
  authorId: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;

const commentResponseSchema = z.object({
  comments: z.array(commentSchema),
  commentsCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
});

export type CommentResponse = z.infer<typeof commentResponseSchema>;