import { motion } from 'framer-motion';

import { Heading } from '@/components/atoms/heading/Heading';
import { Backdrop } from '@/components/atoms/modal/Backdrop';
import { ModalClose } from '@/components/atoms/modal/ModalClose';
import { PostFooter } from '@/components/molecules/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/postHeader/PostHeader';
import { PostSlider } from '@/components/molecules/postSlider/PostSlider';
import { PostComments } from '@/components/organisms/postComments/PostComments';
import { PostData } from '@/components/pages/collection/useCollection';

import styles from './postModal.module.scss';

type PostModalProps = {
  post: PostData;
  close: () => void;
};

export const PostModal = ({ post, close }: PostModalProps) => {
  return (
    <Backdrop close={close}>
      <motion.div role="dialog" className={styles.container}>
        <ModalClose onClose={close} isExternal />
        <PostHeader tag="div" className={styles.postHeader} post={post} />
        <PostSlider post={post} containerClassName={styles.slider} imageClassName={styles.sliderImage} />
        <PostFooter post={post} className={styles.postFooter} />

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
