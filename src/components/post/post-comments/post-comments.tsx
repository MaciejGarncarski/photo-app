import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Comment } from '@/src/components/comment/comment';
import { useInfiniteComments } from '@/src/components/post/post-comments/use-post-comments';

import styles from './post-comments.module.scss';

type PropsTypes = {
  postId: number;
};

export const PostComments = ({ postId }: PropsTypes) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } =
    useInfiniteComments({
      postId: postId,
    });

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 100px 0px',
  });

  if (!data) {
    return null;
  }

  const commentsCount = data.pages[0].commentsCount;

  return (
    <div className={styles.commentsList} ref={sentryRef}>
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
