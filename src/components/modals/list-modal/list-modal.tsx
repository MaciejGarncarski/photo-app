'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import ReactFocusLock from 'react-focus-lock';

import { modalVariants } from '@/src/utils/animations/modal.animation';

import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';

import styles from './list-modal.module.scss';

type Props = {
  closeModal: () => void;
  headingText: string;
  children: ReactNode;
  isVisible: boolean;
};

export const ListModal = ({
  closeModal,
  headingText,
  children,
  isVisible,
}: Props) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop closeModal={closeModal}>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
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
};
