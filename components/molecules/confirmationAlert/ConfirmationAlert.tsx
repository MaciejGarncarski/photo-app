import { motion, Variants } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import { Button } from '@/components/atoms/button/Button';
import { Backdrop } from '@/components/atoms/modal/Backdrop';
import { ModalClose } from '@/components/atoms/modal/ModalClose';

import styles from './confirmationAlert.module.scss';

type PropsTypes = {
  onConfirm: () => void;
  onCancel?: () => void;
  close: () => void;
  headingText?: string;
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

export const ConfirmationAlert = ({ headingText, onConfirm, onCancel, close }: PropsTypes) => {
  const handleCancel = onCancel ? onCancel : close;

  return (
    <Backdrop close={handleCancel} mobileCenter>
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
          <ModalClose onClose={handleCancel} />
          <div className={styles.buttonsRow}>
            <Button type="button" onClick={handleCancel} variant="secondary" className={styles.button}>
              cancel
            </Button>
            <Button type="button" onClick={onConfirm} className={styles.button}>
              confirm
            </Button>
          </div>
        </ReactFocusLock>
      </motion.div>
    </Backdrop>
  );
};
