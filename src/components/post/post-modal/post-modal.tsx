'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';
import { PostComments } from '@/src/components/post/post-comments/post-comments';
import { PostFooter } from '@/src/components/post/post-footer/post-footer';
import { PostHeader } from '@/src/components/post/post-header/post-header';
import { PostImagesCarousel } from '@/src/components/post/post-images-carousel/post-images-carousel';
import { modalVariants } from '@/src/components/post/post-modal/post-modal.animation';
import { Heading } from '@/src/components/typography/heading/heading';
import { Post } from '@/src/schemas/post.schema';

import styles from './post-modal.module.scss';

type Props = {
  post: Post;
  closeModal: () => void;
  isVisible: boolean;
};

export const PostModal = ({ post, closeModal, isVisible }: Props) => {
  const { authorId, id, createdAt } = post;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop mobileCenter closeModal={closeModal}>
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
                postId={id}
              />
              <div className={styles.sliderContainer}>
                <PostImagesCarousel post={post} priority={true} />
              </div>
              <PostFooter post={post} parentModalOpen={isVisible} />
              <section className={styles.commentsContainer}>
                <Heading tag="h2" size="medium">
                  Comments
                </Heading>
                <PostComments postId={id} />
              </section>
            </motion.div>
          </ReactFocusLock>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
