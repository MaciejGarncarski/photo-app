import { useAuth } from "@/hooks/use-auth";

import { Button } from "@/components/buttons/button/button";
import { useCommentForm } from "@/components/forms/comment-form/use-comment-form";
import { TextArea } from "@/components/textarea/text-area";

import styles from "./comment-form.module.scss";

type Props = {
  postId: number;
};

export const CommentForm = ({ postId }: Props) => {
  const { handleSubmit, isDirty, isPending, onSubmit, register } =
    useCommentForm({ postId });

  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addComment}>
      <TextArea
        placeholder="Aa"
        {...register("comment")}
        rows={1}
        secondaryBg
      />
      <Button type="submit" disabled={!isDirty || isPending} variant="primary">
        {isPending ? "Uploading..." : "Comment"}
      </Button>
    </form>
  );
};
