import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { Heading } from '@/src/components/atoms/heading/Heading';
import { ModalBackdrop } from '@/src/components/atoms/modalBackdrop/ModalBackdrop';

import { ModalCloseButton } from '@/src/components/molecules/modalCloseButton/ModalCloseButton';

import { PostFooter } from '@/src/components/organisms/post/postFooter/PostFooter';
import { PostHeader } from '@/src/components/organisms/post/postHeader/PostHeader';
import { PostSlider } from '@/src/components/organisms/post/postSlider/PostSlider';
import { PostComments } from '@/src/components/organisms/postComments/PostComments';
import { modalVariants } from '@/src/components/organisms/postModal/PostModal.animation';

import { Post } from '@/src/consts/schemas';

import styles from './PostModal.module.scss';

type PropsTypes = {
  post: Post;
  closeModal: () => void;
  isVisible: boolean;
};

export const PostModal = ({ post, closeModal, isVisible }: PropsTypes) => {
  const { authorId, postId, createdAt } = post;

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
              <PostHeader tag="div" authorId={authorId} createdAt={createdAt} postId={postId} />
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
