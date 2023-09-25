import { Button } from '@/src/components/buttons/button/button';
import { useCommentForm } from '@/src/components/forms/comment-form/use-comment-form';
import { TextArea } from '@/src/components/textarea/text-area';

import styles from './comment-form.module.scss';

type Props = {
  postId: number;
};

export const CommentForm = ({ postId }: Props) => {
  const { handleSubmit, isDirty, isPending, onSubmit, register } =
    useCommentForm({ postId });

  if (isPending) {
    return <p>Uploading...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addComment}>
      <TextArea placeholder="Aa" {...register('comment')} rows={1} />
      <Button type="submit" disabled={!isDirty} variant="primary">
        Comment
      </Button>
    </form>
  );
};
