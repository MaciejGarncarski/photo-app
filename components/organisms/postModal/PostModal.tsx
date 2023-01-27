import { motion } from 'framer-motion';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { Backdrop } from '@/components/atoms/modal/Backdrop';
import { ModalClose } from '@/components/atoms/modal/ModalClose';
import { Comment } from '@/components/molecules/comment/Comment';
import { PostHeader } from '@/components/molecules/postHeader/PostHeader';
import { PostSlider } from '@/components/molecules/postSlider/PostSlider';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';
import { useInfiniteComments } from '@/components/organisms/postModal/useInfiniteComments';
import { PostData } from '@/components/pages/collection/useCollection';

import styles from './postModal.module.scss';

type PostModalProps = {
  post: PostData;
  close: () => void;
};

export const PostModal = ({ post, close }: PostModalProps) => {
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
    <Backdrop close={close}>
      <motion.div role="dialog" className={styles.container}>
        <ModalClose onClose={close} />
        <PostHeader
          tag="div"
          variant={isMobile ? undefined : 'no-margin-left'}
          className={styles.postHeader}
          post={post}
        />
        <PostSlider post={post} containerClassName={styles.slider} imageClassName={styles.sliderImage} />
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
    </Backdrop>
  );
};
