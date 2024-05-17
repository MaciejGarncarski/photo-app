import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useAddComment } from "@/components/forms/comment-form/use-add-comment";
import { commentTextSchema } from "@/schemas/post-comment.schema";

const commentFormSchema = z.object({
  comment: z.string().max(50),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

type Arguments = {
  postId: number;
};

export const useCommentForm = ({ postId }: Arguments) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, errors },
  } = useForm<CommentFormValues>({
    defaultValues: {
      comment: "",
    },
  });

  const { mutate, isPending } = useAddComment({ postId });

  const onSubmit: SubmitHandler<CommentFormValues> = ({ comment }) => {
    const result = commentTextSchema.safeParse(comment);

    if (!result.success) {
      return toast.error("Cannot add comment");
    }

    mutate(
      { commentText: result.data, postId: postId.toString() },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return { onSubmit, isPending, register, handleSubmit, isDirty, errors };
};
