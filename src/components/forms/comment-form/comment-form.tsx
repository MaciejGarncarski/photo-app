import clsx from 'clsx';

import { Button } from '@/src/components/buttons/button/button';
import { useCommentForm } from '@/src/components/forms/comment-form/use-comment-form';

import styles from './comment-form.module.scss';

type Props = {
  postId: number;
};

export const CommentForm = ({ postId }: Props) => {
  const { errors, handleSubmit, isDirty, isLoading, onSubmit, register } =
    useCommentForm({ postId });

  if (isLoading) {
    return <p>Uploading...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addComment}>
      <textarea
        className={clsx(
          errors.comment && styles.commentInputError,
          styles.commentInput,
        )}
        {...register('comment')}
      />
      <Button type="submit" disabled={!isDirty} variant="primary">
        post
      </Button>
    </form>
  );
};
