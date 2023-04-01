import { AnimatePresence, motion, Variants } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { PostData } from '@/utils/apis/transformPost';

import { Heading } from '@/components/atoms/heading/Heading';
import { ModalBackdrop } from '@/components/atoms/modalBackdrop/ModalBackdrop';
import { ModalClose } from '@/components/molecules/modal/ModalClose';
import { PostFooter } from '@/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/post/postHeader/PostHeader';
import { PostSlider } from '@/components/molecules/post/postSlider/PostSlider';
import { PostComments } from '@/components/organisms/postComments/PostComments';

import styles from './postModal.module.scss';

type PropsTypes = {
  post: PostData;
  close: () => void;
  isVisible: boolean;
};

const modalVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: { y: 0, opacity: 1 },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
};

export const PostModal = ({ post, close, isVisible }: PropsTypes) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop close={close}>
          <ReactFocusLock>
            <ModalClose onClose={close} outside />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              className={styles.container}
            >
              <PostHeader tag="div" post={post} />
              <div className={styles.sliderContainer}>
                <PostSlider post={post} priority={true} />
              </div>
              <PostFooter post={post} parentModalOpen={isVisible} />
              <section className={styles.commentsContainer}>
                <Heading tag="h2" size="medium">
                  Comments
                </Heading>
                <PostComments postId={post.postId} />
              </section>
            </motion.div>
          </ReactFocusLock>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
