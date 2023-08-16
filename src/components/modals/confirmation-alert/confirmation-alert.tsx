'use client';

import { IconAlertTriangleFilled } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { Button } from '@/src/components/buttons/button/button';
import { alertVariants } from '@/src/components/modals/confirmation-alert/confirmation-alert.animation';
import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';

import styles from './confirmation-alert.module.scss';

type Props = {
  onConfirm: () => void;
  closeModal: () => void;
  headingText?: string;
  isVisible: boolean;
};

export const ConfirmationAlert = ({
  headingText,
  onConfirm,
  closeModal,
  isVisible,
}: Props) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop closeModal={closeModal} mobileCenter>
          <motion.div
            role="dialog"
            className={styles.container}
            variants={alertVariants}
            initial="closed"
            animate="opened"
            exit="exit"
          >
            <div className={styles.headingContainer}>
              <IconAlertTriangleFilled />
              <h3 className={styles.heading}>
                {headingText || 'Are you sure?'}
              </h3>
            </div>
            <ReactFocusLock>
              <div className={styles.buttonsRow}>
                <Button type="button" onClick={closeModal} variant="secondary">
                  cancel
                </Button>
                <Button type="button" onClick={onConfirm} variant="primary">
                  confirm
                </Button>
              </div>
            </ReactFocusLock>
          </motion.div>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
