'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';
import { usePost } from '@/src/components/pages/account/use-post';
import { PostComments } from '@/src/components/post/post-comments/post-comments';
import { PostFooter } from '@/src/components/post/post-footer/post-footer';
import { PostHeader } from '@/src/components/post/post-header/post-header';
import { PostImagesCarousel } from '@/src/components/post/post-images-carousel/post-images-carousel';
import { modalVariants } from '@/src/components/post/post-modal/post-modal.animation';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './post-modal.module.scss';

type Props = {
  postId: number;
  closeModal: () => void;
  isVisible: boolean;
};

export const PostModal = ({ postId, closeModal, isVisible }: Props) => {
  const { data: post, isLoading } = usePost({ postId });

  if (isLoading || !post) {
    return null;
  }

  const { authorId, createdAt } = post;

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
              <PostHeader
                tag="div"
                authorId={authorId}
                createdAt={createdAt.toString()}
                postId={postId}
              />
              <div className={styles.sliderContainer}>
                <PostImagesCarousel postId={postId} priority={true} />
              </div>
              <PostFooter postId={postId} parentModalOpen={isVisible} />
              <section className={styles.commentsContainer}>
                <Heading tag="h2" size="medium">
                  Comments
                </Heading>
                <PostComments postId={postId} />
              </section>
            </motion.div>
          </ReactFocusLock>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
