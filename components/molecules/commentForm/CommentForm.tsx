import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { PostData } from '@/utils/transformPost';

import { Button } from '@/components/atoms/button/Button';
import { HOME_POSTS_QUERY_KEY } from '@/components/pages/home/useInfinitePosts';

import { CommentPutRequestSchema } from '@/pages/api/post/comment';

import styles from './commentForm.module.scss';

const commentFormSchema = z.object({
  comment: z.string().max(50),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

type PropsTypes = {
  post: PostData;
};

type PutCommentRequest = z.infer<typeof CommentPutRequestSchema>;

export const CommentForm = ({ post }: PropsTypes) => {
  const queryClient = useQueryClient();

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

  const { mutate, isLoading } = useMutation(
    async ({ commentText, postId }: PutCommentRequest) => {
      await axios.put<unknown, null, PutCommentRequest>('/api/post/comment', {
        commentText,
        postId,
      });
    },
    {
      onSuccess: () => reset(),
      onSettled: () => {
        queryClient.invalidateQueries(HOME_POSTS_QUERY_KEY);
        queryClient.invalidateQueries(['post', post.postId]);
        queryClient.invalidateQueries(['infinite comments', post.postId]);
      },
    },
  );

  const onSubmit: SubmitHandler<CommentFormValues> = ({ comment }) => {
    mutate({ commentText: comment, postId: post.postId });
  };

  if (isLoading) {
    return <p>Uploading...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addComment}>
      <textarea
        className={clsx(errors.comment && styles.commentInputError, styles.commentInput)}
        {...register('comment')}
      ></textarea>
      <Button type="submit" className={styles.postButton} disabled={!isDirty}>
        post
      </Button>
    </form>
  );
};
