import { useMutationState } from '@tanstack/react-query';

import { useAuth } from '@/src/hooks/use-auth';
import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { Comment } from '@/src/components/comment/comment';
import {
  COMMENT_MUTATION_KEY,
  CommentMutationVariables,
} from '@/src/components/forms/comment-form/use-add-comment';
import { Loader } from '@/src/components/loader/loader';
import { useInfiniteComments } from '@/src/components/post/post-comments/use-infinite-comments';

import styles from './post-comments.module.scss';

type Props = {
  postId: number;
};

export const PostComments = ({ postId }: Props) => {
  const { sessionUser } = useAuth();

  const { data, hasNextPage, fetchNextPage, isPending } = useInfiniteComments({
    postId: postId,
  });

  const [comment] = useMutationState<CommentMutationVariables | undefined>({
    filters: { mutationKey: COMMENT_MUTATION_KEY, status: 'pending' },
    select: (mutation) =>
      mutation.state.variables as CommentMutationVariables | undefined,
  });

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  if (!data) {
    return null;
  }

  const commentsCount = data.pages[0].commentsCount;

  return (
    <div className={styles.commentsList}>
      {comment && (
        <Comment
          commentData={{
            authorId: sessionUser?.id || '',
            commentId: 0,
            createdAt: new Date().toString(),
            isLiked: false,
            likesCount: 0,
            postId: postId,
            text: comment.commentText,
          }}
        />
      )}
      {commentsCount > 0 && (
        <>
          {data.pages.map((page) => {
            return page.comments.map((comment) => {
              return <Comment key={comment.commentId} commentData={comment} />;
            });
          })}
        </>
      )}
      {commentsCount === 0 && <p>No comments.</p>}
      {hasNextPage && !isPending && (
        <span ref={ref}>
          <Loader color="accent" size="small" />
        </span>
      )}
    </div>
  );
};
