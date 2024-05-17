import { z } from "zod";

export const commentTextSchema = z
  .string()
  .max(100, { message: "Maximum characters exceeded." });

const commentSchema = z.object({
  text: z.string().max(100, { message: "Maximum characters exceeded." }),
  createdAt: z.string(),
  likesCount: z.number(),
  isLiked: z.boolean(),
  postId: z.number(),
  commentId: z.number(),
  authorId: z.string(),
});

export type Comment = z.infer<typeof commentSchema>;
