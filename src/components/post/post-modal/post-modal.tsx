'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { modalVariants } from '@/src/utils/animations/modal.animation';

import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';
import { usePost } from '@/src/components/pages/account/use-post';
import { PostComments } from '@/src/components/post/post-comments/post-comments';
import { PostFooter } from '@/src/components/post/post-footer/post-footer';
import { PostHeader } from '@/src/components/post/post-header/post-header';
import { PostImagesCarousel } from '@/src/components/post/post-images-carousel/post-images-carousel';

import styles from './post-modal.module.scss';

type Props = {
  postId: number;
  closeModal: () => void;
  isVisible: boolean;
};

export const PostModal = ({ postId, closeModal, isVisible }: Props) => {
  const { data: post, isLoading } = usePost({ postId });
  const { isMobile } = useIsMobile();
  if (isLoading || !post) {
    return null;
  }

  const { authorId, createdAt } = post;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop closeModal={closeModal}>
          <ReactFocusLock autoFocus={false}>
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              className={styles.container}
            >
              <div className={styles.closeButton}>
                <ModalCloseButton onClose={closeModal} />
              </div>

              <div className={styles.columns}>
                {isMobile && (
                  <PostHeader
                    tag="div"
                    authorId={authorId}
                    createdAt={createdAt.toString()}
                    postId={postId}
                  />
                )}
                <div className={styles.leftColumn}>
                  <PostImagesCarousel postId={postId} priority={true} />
                </div>
                <div className={styles.rightColumn}>
                  {!isMobile && (
                    <PostHeader
                      tag="div"
                      authorId={authorId}
                      createdAt={createdAt.toString()}
                      postId={postId}
                    />
                  )}
                  <PostFooter postId={postId} parentModalOpen={isVisible} />
                  <section className={styles.commentsContainer}>
                    <PostComments postId={postId} />
                  </section>
                </div>
              </div>
            </motion.div>
          </ReactFocusLock>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
