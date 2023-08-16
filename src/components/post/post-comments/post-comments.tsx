import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { Comment } from '@/src/components/comment/comment';
import { useInfiniteComments } from '@/src/components/post/post-comments/use-post-comments';

import styles from './post-comments.module.scss';

type Props = {
  postId: number;
};

export const PostComments = ({ postId }: Props) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteComments({
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

  return (
    <div className={styles.commentsList} ref={ref}>
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
    </div>
  );
};
