import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import ReactFocusLock from 'react-focus-lock';

import { ModalBackdrop } from '@/components/atoms/modalBackdrop/ModalBackdrop';
import { ModalClose } from '@/components/molecules/modal/ModalClose';

import styles from './listModal.module.scss';

type PropsTypes = {
  close: () => void;
  headingText: string;
  children: ReactNode;
  isVisible: boolean;
};

export const ListModal = ({ close, headingText, children, isVisible }: PropsTypes) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop close={close}>
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className={styles.container}>
            <h3 className={styles.heading}>{headingText}</h3>
            <ReactFocusLock>
              <ModalClose onClose={close} />
              <ul className={styles.list}>{children}</ul>
            </ReactFocusLock>
          </motion.div>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
