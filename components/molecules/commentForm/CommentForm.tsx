import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './commentForm.module.scss';

import { Button } from '@/components/atoms/button/Button';
import { PostData } from '@/components/pages/collection/useCollection';

type CommentFormValues = {
  comment: string;
};

type Mutation = {
  comment: string;
  id: number;
};

export type CommentFormProps = {
  post: PostData;
};

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

  const { id } = post;

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
    mutate({ comment, id });
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
