'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import ReactFocusLock from 'react-focus-lock';

import { modalVariants } from '@/src/utils/animations/modal.animation';

import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';

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
              role="dialog"
              className={styles.container}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.headingContainer}>
                <h3 className={styles.heading}>Confirmation</h3>
                <ModalCloseButton onClose={closeModal} variant="primary" />
              </div>
              <p className={styles.description}>{text}</p>
              <div className={styles.buttonsRow}>
                {children}
                {/* <Button type="button" onClick={closeModal} variant="secondary">
                  cancel
                </Button>
                <Button type="button" onClick={onConfirm} variant="primary">
                  confirm
                </Button> */}
              </div>
            </motion.div>
          </ReactFocusLock>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
