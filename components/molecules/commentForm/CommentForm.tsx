import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './commentForm.module.scss';

import { Button } from '@/components/atoms/button/Button';

type CommentFormValues = {
  comment: string;
};

type Mutation = {
  comment: string;
  id: number;
};

export type postID = {
  postID: number;
};

export const CommentForm = ({ postID }: postID) => {
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
    async ({ comment, id }: Mutation) => {
      await axios.put('/api/post/comment', {
        comment,
        id,
      });
    },
    { onSuccess: () => reset() }
  );

  const onSubmit: SubmitHandler<CommentFormValues> = ({ comment }) => {
    mutate({ comment, id: postID });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addComment}>
      <textarea
        className={styles.commentInput}
        {...register('comment')}
        rows={3}
        cols={25}
      ></textarea>
      <Button type='submit' disabled={!isDirty}>
        post
      </Button>
    </form>
  );
};
