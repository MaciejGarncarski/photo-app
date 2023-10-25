'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { modalVariants } from '@/src/utils/animations/modal.animation';

import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';
import { PostModalDesktop } from '@/src/components/post/post-modal/post-modal-desktop';
import { PostModalMobile } from '@/src/components/post/post-modal/post-modal-mobile';
import { usePostModal } from '@/src/components/post/post-modal/use-post-modal';

import styles from './post-modal.module.scss';

type Props = {
  postId: number;
  closeModal: () => void;
  isVisible: boolean;
  isPostPage?: boolean;
};

export const PostModal = ({
  closeModal,
  isVisible,
  postId,
  isPostPage,
}: Props) => {
  const { isMobile } = useIsMobile();
  const { handleClose } = usePostModal({
    closeModal,
    isPostPage: Boolean(isPostPage),
    postId,
  });

  if (isMobile === 'loading') {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop closeModal={handleClose}>
          <ReactFocusLock autoFocus={false} className={styles.focusLock}>
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              className={styles.container}
            >
              {isMobile ? (
                <PostModalMobile closeModal={handleClose} postId={postId} />
              ) : (
                <PostModalDesktop closeModal={handleClose} postId={postId} />
              )}
            </motion.div>
          </ReactFocusLock>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
