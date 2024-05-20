"use client";

import { AnimatePresence, motion } from "framer-motion";
import ReactFocusLock from "react-focus-lock";

import { useIsTabletOrMobile } from "@/hooks/use-is-tablet-or-mobile";
import { modalVariants } from "@/utils/animations/modal.animation";

import { ModalBackdrop } from "@/components/modals/modal-backdrop/modal-backdrop";
import { PostModalDesktop } from "@/components/post/post-modal/post-modal-desktop";
import { PostModalMobile } from "@/components/post/post-modal/post-modal-mobile";
import { usePostModal } from "@/components/post/post-modal/use-post-modal";

import styles from "./post-modal.module.scss";

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
  const { isTabletOrMobile } = useIsTabletOrMobile();
  const { handleClose } = usePostModal({
    closeModal,
    isPostPage: Boolean(isPostPage),
    postId,
  });

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
              {isTabletOrMobile ? (
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
