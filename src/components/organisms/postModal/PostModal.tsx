import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { PostData } from '@/src/utils/apis/transformPost';

import { Heading } from '@/src/components/atoms/heading/Heading';
import { ModalBackdrop } from '@/src/components/atoms/modalBackdrop/ModalBackdrop';

import { ModalCloseButton } from '@/src/components/molecules/modalCloseButton/ModalCloseButton';

import { PostFooter } from '@/src/components/organisms/post/postFooter/PostFooter';
import { PostHeader } from '@/src/components/organisms/post/postHeader/PostHeader';
import { PostSlider } from '@/src/components/organisms/post/postSlider/PostSlider';
import { PostComments } from '@/src/components/organisms/postComments/PostComments';
import { modalVariants } from '@/src/components/organisms/postModal/PostModal.animation';

import styles from './postModal.module.scss';

type PropsTypes = {
  post: PostData;
  closeModal: () => void;
  isVisible: boolean;
};

export const PostModal = ({ post, closeModal, isVisible }: PropsTypes) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop closeModal={closeModal}>
          <ReactFocusLock>
            <ModalCloseButton onClose={closeModal} outside />
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
