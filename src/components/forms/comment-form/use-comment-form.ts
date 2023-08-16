import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { z } from 'zod';

import { useAddComment } from '@/src/components/forms/comment-form/use-add-comment';
import { commentTextSchema } from '@/src/schemas/post-comment';

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
      comment: '',
    },
  });

  const { mutate, isPending } = useAddComment({ postId });

  const onSubmit: SubmitHandler<CommentFormValues> = ({ comment }) => {
    const result = commentTextSchema.safeParse(comment);

    if (!result.success) {
      return toast.error('Cannot add comment');
    }

    mutate({ commentText: result.data, postId }, { onSuccess: () => reset() });
  };

  return { onSubmit, isPending, register, handleSubmit, isDirty, errors };
};
