import { motion } from 'framer-motion';

import { unlock } from '@/utils/bodyLock';
import { PostData } from '@/utils/transformPost';

import { Heading } from '@/components/atoms/heading/Heading';
import { Backdrop } from '@/components/molecules/modal/Backdrop';
import { ModalClose } from '@/components/molecules/modal/ModalClose';
import { PostFooter } from '@/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/post/postHeader/PostHeader';
import { PostSlider } from '@/components/molecules/post/postSlider/PostSlider';
import { PostComments } from '@/components/organisms/postComments/PostComments';

import styles from './postModal.module.scss';

type PropsTypes = {
  post: PostData;
  close: () => void;
  modalOpen: boolean;
};

export const PostModal = ({ post, close, modalOpen }: PropsTypes) => {
  const onClose = () => {
    unlock();
    close();
  };

  return (
    <Backdrop close={onClose}>
      <motion.div role="dialog" className={styles.container}>
        <ModalClose onClose={onClose} isExternal />
        <PostHeader tag="div" post={post} />
        <PostSlider post={post} containerClassName={styles.slider} imageClassName={styles.sliderImage} />
        <PostFooter post={post} parentModalOpen={modalOpen} />

        <section className={styles.commentsContainer}>
          <Heading tag="h2" className={styles.commentsHeading}>
            Comments
          </Heading>
          <PostComments postId={post.postId} className={styles.commentsList} />
        </section>
      </motion.div>
    </Backdrop>
  );
};
