"use client";

import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import ReactFocusLock from "react-focus-lock";

import { modalVariants } from "@/utils/animations/modal.animation";

import { ModalCloseButton } from "@/components/buttons/modal-close-button/modal-close-button";
import { ModalBackdrop } from "@/components/modals/modal-backdrop/modal-backdrop";

import styles from "./list-modal.module.scss";

type Props = {
  closeModal: () => void;
  headingText: string;
  children: ReactNode;
  isVisible: boolean;
};

export const ListModal = forwardRef<HTMLDivElement, Props>(
  ({ closeModal, headingText, children, isVisible }, ref) => {
    return (
      <AnimatePresence mode="wait">
        {isVisible && (
          <ModalBackdrop closeModal={closeModal}>
            <motion.div
              initial="hidden"
              animate="visible"
              role="dialog"
              exit="exit"
              variants={modalVariants}
              ref={ref}
              className={styles.container}
            >
              <ReactFocusLock className={styles.focusLock}>
                <div className={styles.header}>
                  <h3 className={styles.heading}>{headingText}</h3>
                  <ModalCloseButton onClose={closeModal} variant="primary" />
                </div>
                <ul className={styles.list}>{children}</ul>
              </ReactFocusLock>
            </motion.div>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    );
  },
);
