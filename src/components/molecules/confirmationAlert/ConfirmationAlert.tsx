import { AnimatePresence, motion, Variants } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { Button } from '@/components/atoms/buttons/button/Button';
import { ModalBackdrop } from '@/components/atoms/modalBackdrop/ModalBackdrop';
import { ModalClose } from '@/components/molecules/modal/ModalClose';

import styles from './confirmationAlert.module.scss';

type PropsTypes = {
  onConfirm: () => void;
  close: () => void;
  headingText?: string;
  isVisible: boolean;
};

const alertVariants: Variants = {
  opened: {
    scale: 1,
    opacity: 1,
    y: 0,
  },
  closed: {
    scale: 0,
    opacity: 0,
    y: 100,
  },
  exit: {
    scale: 0.6,
    opacity: 0,
  },
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
