import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './postModal.module.scss';

import { MotionImage } from '@/components/atoms/avatar/Avatar';
import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { dialogVariant, Modal } from '@/components/atoms/modal/Modal';
import { Comment } from '@/components/molecules/comment/Comment';
import { PostHeader } from '@/components/molecules/postHeader/PostHeader';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';
import { useInfiniteComments } from '@/components/organisms/postModal/useInfiniteComments';
import { PostData } from '@/components/pages/collection/useCollection';

type PostModalProps = {
  post: PostData;
  setIsOpen: (isOpen: boolean) => void;
};

export const PostModal = ({ post, setIsOpen }: PostModalProps) => {
  const [isImgLoading, setIsImgLoading] = useState<boolean>(true);
  const { isMobile } = useScreenWidth();

  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useInfiniteComments({
    postId: post.id,
  });

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 100px 0px',
  });

  if (!data) {
    return <Loading />;
  }

  const commentsCount = data.pages[0].commentsCount;

  return (
    <Modal.Overlay setOpen={setIsOpen}>
      <motion.div
        variants={dialogVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="dialog"
        className={styles.container}
      >
        <Modal.Close onClose={() => setIsOpen(false)} />
        <PostHeader
          tag="div"
          variant={isMobile ? undefined : 'no-margin-left'}
          className={styles.postHeader}
          post={post}
        />
        {isImgLoading && <Loading />}
        <MotionImage
          className={clsx(isImgLoading && styles.imgLoading, styles.postImg)}
          src={post.images}
          alt="post"
          initial={{ opacity: 0 }}
          animate={!isImgLoading ? { opacity: 1 } : { opacity: 0 }}
          onLoad={() => setIsImgLoading(false)}
          width={200}
          height={200}
        />
        <section className={styles.commentsContainer}>
          <Heading tag="h2">Comments</Heading>
          <div className={styles.comments} ref={sentryRef}>
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
        </section>
      </motion.div>
    </Modal.Overlay>
  );
};
