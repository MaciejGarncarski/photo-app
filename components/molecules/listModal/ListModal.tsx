import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import ReactFocusLock from 'react-focus-lock';

import { Backdrop } from '@/components/atoms/modal/Backdrop';
import { ModalClose } from '@/components/atoms/modal/ModalClose';

import styles from './listModal.module.scss';

type PropsTypes = {
  close: () => void;
  headingText: string;
  children: ReactNode;
};

export const ListModal = ({ close, headingText, children }: PropsTypes) => {
  return (
    <Backdrop close={close}>
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ scale: 0.95, y: 120 }} className={styles.container}>
        <h3 className={styles.heading}>{headingText}</h3>
        <ReactFocusLock>
          <ModalClose onClose={close} />
          <ul className={styles.list}>{children}</ul>
        </ReactFocusLock>
      </motion.div>
    </Backdrop>
  );
};
