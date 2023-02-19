import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/atoms/button/Button';
import { PostData } from '@/components/pages/collection/useCollection';
import { HOME_POSTS_QUERY_KEY } from '@/components/pages/home/useInfinitePosts';

import { CommentPutRequestSchema } from '@/pages/api/post/comment';

import styles from './commentForm.module.scss';

type CommentFormValues = {
  comment: string;
};

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
    formState: { isDirty },
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
      <textarea className={styles.commentInput} {...register('comment')} rows={3} cols={25}></textarea>
      <Button type="submit" className={styles.postButton} disabled={!isDirty}>
        post
      </Button>
    </form>
  );
};
