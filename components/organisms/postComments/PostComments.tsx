import clsx from 'clsx';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Comment } from '@/components/molecules/comment/Comment';
import { useInfiniteComments } from '@/components/organisms/postModal/useInfiniteComments';

import styles from './postComments.module.scss';

type PropsTypes = {
  postId: number;
  className?: string;
};

export const PostComments = ({ postId, className }: PropsTypes) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useInfiniteComments({
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
    <div className={clsx(className, styles.commentsList)} ref={sentryRef}>
      {commentsCount > 0 && (
        <>
          {data.pages.map((page) => {
            return page.comments.map((comment) => {
              return <Comment key={comment.id} commentData={comment} />;
            });
          })}
        </>
      )}
      {commentsCount === 0 && <p>No comments.</p>}
    </div>
  );
};