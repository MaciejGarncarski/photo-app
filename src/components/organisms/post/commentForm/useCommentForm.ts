import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAddComment } from '@/src/components/organisms/post/commentForm/useAddComment';

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

  const { mutate, isLoading } = useAddComment({ postId });

  const onSubmit: SubmitHandler<CommentFormValues> = ({ comment }) => {
    mutate({ commentText: comment, postId }, { onSuccess: () => reset() });
  };

  return { onSubmit, isLoading, register, handleSubmit, isDirty, errors };
};
