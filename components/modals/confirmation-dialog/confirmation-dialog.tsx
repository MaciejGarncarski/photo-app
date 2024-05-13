'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import ReactFocusLock from 'react-focus-lock';

import { modalVariants } from '@/utils/animations/modal.animation';

import { ModalBackdrop } from '@/components/modals/modal-backdrop/modal-backdrop';

import styles from './confirmation-dialog.module.scss';

type Props = {
  closeModal: () => void;
  text: string;
  children: ReactNode;
  isVisible: boolean;
};

export const ConfirmationDialog = ({
  text,
  children,
  closeModal,
  isVisible,
}: Props) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop closeModal={closeModal}>
          <ReactFocusLock autoFocus={false}>
            <motion.div
              role="alertdialog"
              className={styles.container}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.headingContainer}>
                <h3 className={styles.heading}>Are you sure?</h3>
              </div>
              <p className={styles.text}>{text}</p>
              <div className={styles.buttonsRow}>{children}</div>
            </motion.div>
          </ReactFocusLock>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
