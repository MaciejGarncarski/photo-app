'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ReactFocusLock from 'react-focus-lock';

import { useUser } from '@/src/hooks/use-user';
import { modalVariants } from '@/src/utils/animations/modal.animation';

import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { CommentForm } from '@/src/components/forms/comment-form/comment-form';
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
  isPostPage?: boolean;
};

export const PostModal = ({
  postId,
  closeModal,
  isVisible,
  isPostPage,
}: Props) => {
  const { data: post, isLoading } = usePost({ postId });
  const { data: author } = useUser({ userId: post?.authorId || '' });
  const router = useRouter();

  if (isLoading || !post) {
    return null;
  }

  const { authorId, createdAt } = post;

  const handleClose = () => {
    closeModal();
    if (isPostPage) {
      router.push(`/${author?.username}`);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop closeModal={handleClose}>
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
                <ModalCloseButton onClose={handleClose} />
              </div>
              <PostHeader
                tag="div"
                authorId={authorId}
                createdAt={createdAt.toString()}
                postId={postId}
              />
              <div className={styles.content}>
                <div className={styles.carousel}>
                  <PostImagesCarousel postId={postId} priority={true} />
                </div>
                <PostFooter postId={postId} parentModalOpen={isVisible} />
                <section className={styles.commentsContainer}>
                  <PostComments postId={postId} />
                  <CommentForm postId={postId} />
                </section>
              </div>
            </motion.div>
          </ReactFocusLock>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
