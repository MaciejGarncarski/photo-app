import clsx from 'clsx';

import { Button } from '@/src/components/atoms/buttons/button/Button';

import { useCommentForm } from '@/src/components/organisms/post/commentForm/useCommentForm';

import styles from './CommentForm.module.scss';

type PropsTypes = {
  postId: number;
};

export const CommentForm = ({ postId }: PropsTypes) => {
  const { errors, handleSubmit, isDirty, isLoading, onSubmit, register } = useCommentForm({ postId });

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
