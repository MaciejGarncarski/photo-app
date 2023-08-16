'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { modalVariants } from '@/src/utils/animations/modal.animation';

import { Button } from '@/src/components/buttons/button/button';
import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';

import styles from './confirmation-alert.module.scss';

type Props = {
  onConfirm: () => void;
  closeModal: () => void;
  text?: string;
  isVisible: boolean;
};

export const ConfirmationAlert = ({
  text,
  onConfirm,
  closeModal,
  isVisible,
}: Props) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop closeModal={closeModal}>
          <ReactFocusLock>
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
                <ModalCloseButton onClose={closeModal} />
              </div>
              <p className={styles.description}>{text}</p>
              <div className={styles.buttonsRow}>
                <Button type="button" onClick={onConfirm} variant="secondary">
                  confirm
                </Button>
                <Button type="button" onClick={closeModal} variant="primary">
                  cancel
                </Button>
              </div>
            </motion.div>
          </ReactFocusLock>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
