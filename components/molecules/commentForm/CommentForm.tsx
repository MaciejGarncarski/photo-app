import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './commentForm.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { PostData } from '@/components/pages/collection/useCollection';

import { CommentPutRequestSchema } from '@/pages/api/post/comment';

type CommentFormValues = {
  comment: string;
};

export type CommentFormProps = {
  post: PostData;
};

type Mutation = z.infer<typeof CommentPutRequestSchema>;

export const CommentForm = ({ post }: CommentFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<CommentFormValues>({
    defaultValues: {
      comment: '',
    },
  });

  const { mutate } = useMutation(
    async ({ commentText, postId }: Mutation) => {
      await axios.put<null, null, Mutation>('/api/post/comment', {
        commentText,
        postId,
      });
    },
    { onSuccess: () => reset() }
  );

  const onSubmit: SubmitHandler<CommentFormValues> = ({ comment }) => {
    mutate({ commentText: comment, postId: post.id });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addComment}>
      <textarea
        className={styles.commentInput}
        {...register('comment')}
        rows={3}
        cols={25}
      ></textarea>
      <Button type='submit' className={styles.postButton} disabled={!isDirty}>
        post
      </Button>
    </form>
  );
};
