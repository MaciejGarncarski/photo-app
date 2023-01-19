import { motion } from 'framer-motion';
import ReactFocusLock from 'react-focus-lock';

import styles from './modal.module.scss';

import { dialogVariant } from '@/components/atoms/modal/Modal';
import { Children } from '@/components/layout/Layout';

export const ModalContainer = ({ children }: Children) => {
  return (
    <motion.div
      variants={dialogVariant}
      initial="hidden"
      exit="exit"
      animate="visible"
      className={styles.dialog}
      role="dialog"
    >
      <ReactFocusLock>{children}</ReactFocusLock>
    </motion.div>
  );
};
