import { AnimatePresence, motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { ModalBackdrop } from '@/src/components/atoms/modalBackdrop/ModalBackdrop';
import { alertVariants } from '@/src/components/molecules/confirmationAlert/ConfirmationAlert.animation';
import { ModalClose } from '@/src/components/molecules/modal/ModalClose';

import styles from './confirmationAlert.module.scss';

type PropsTypes = {
  onConfirm: () => void;
  close: () => void;
  headingText?: string;
  isVisible: boolean;
};

export const ConfirmationAlert = ({ headingText, onConfirm, close, isVisible }: PropsTypes) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop close={close} mobileCenter>
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
              <ModalClose onClose={close} />
              <div className={styles.buttonsRow}>
                <Button type="button" onClick={close} variant="secondary">
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
