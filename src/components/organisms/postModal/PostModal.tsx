import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { PostData } from '@/src/utils/apis/transformPost';

import { Heading } from '@/src/components/atoms/heading/Heading';
import { ModalBackdrop } from '@/src/components/atoms/modalBackdrop/ModalBackdrop';
import { ModalClose } from '@/src/components/molecules/modal/ModalClose';
import { PostFooter } from '@/src/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/src/components/molecules/post/postHeader/PostHeader';
import { PostSlider } from '@/src/components/molecules/post/postSlider/PostSlider';
import { PostComments } from '@/src/components/organisms/postComments/PostComments';
import { modalVariants } from '@/src/components/organisms/postModal/PostModal.animation';

import styles from './postModal.module.scss';

type PropsTypes = {
  post: PostData;
  close: () => void;
  isVisible: boolean;
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
