import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { Comment } from '@/src/components/comment/comment';
import { Loader } from '@/src/components/loader/loader';
import { useInfiniteComments } from '@/src/components/post/post-comments/use-infinite-comments';

import styles from './post-comments.module.scss';

type Props = {
  postId: number;
};

export const PostComments = ({ postId }: Props) => {
  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteComments({
    postId: postId,
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

  if (commentsCount === 0) {
    return null;
  }

  return (
    <div className={styles.commentsList}>
      {commentsCount > 0 && (
        <>
          {data.pages.map((page) => {
            return page.comments.map((comment) => {
              return <Comment key={comment.commentId} commentData={comment} />;
            });
          })}
        </>
      )}
      {hasNextPage && !isLoading && (
        <span ref={ref}>
          <Loader color="accent" size="small" />
        </span>
      )}
      {commentsCount === 0 && <p>No comments.</p>}
    </div>
  );
};
