import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { ModalBackdrop } from '@/src/components/atoms/modalBackdrop/ModalBackdrop';

import { ModalCloseButton } from '@/src/components/molecules/modalCloseButton/ModalCloseButton';

import { alertVariants } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert.animation';

import styles from './ConfirmationAlert.module.scss';

type PropsTypes = {
  onConfirm: () => void;
  closeModal: () => void;
  headingText?: string;
  isVisible: boolean;
};

export const ConfirmationAlert = ({ headingText, onConfirm, closeModal, isVisible }: PropsTypes) => {
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
            <h3 className={styles.heading}>{headingText || 'Are you sure?'}</h3>
            <ReactFocusLock>
              <ModalCloseButton onClose={closeModal} />
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
