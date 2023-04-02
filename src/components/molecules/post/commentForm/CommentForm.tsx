import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { PostData } from '@/src/utils/apis/transformPost';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { useAddComment } from '@/src/components/molecules/post/commentForm/useAddComment';

import styles from './commentForm.module.scss';

const commentFormSchema = z.object({
  comment: z.string().max(50),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

type PropsTypes = {
  post: PostData;
};

export const CommentForm = ({ post }: PropsTypes) => {
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

  const { mutate, isLoading } = useAddComment({ postId: post.postId });

  const onSubmit: SubmitHandler<CommentFormValues> = ({ comment }) => {
    mutate({ commentText: comment, postId: post.postId }, { onSuccess: () => reset() });
  };

  if (isLoading) {
    return <p>Uploading...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addComment}>
      <textarea
        className={clsx(errors.comment && styles.commentInputError, styles.commentInput)}
        {...register('comment')}
      />
      <Button type="submit" disabled={!isDirty} variant="primary">
        post
      </Button>
    </form>
  );
};
