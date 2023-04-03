import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import ReactFocusLock from 'react-focus-lock';

import { ModalBackdrop } from '@/src/components/atoms/modalBackdrop/ModalBackdrop';

import { ModalCloseButton } from '@/src/components/molecules/modalCloseButton/ModalCloseButton';

import styles from './listModal.module.scss';

type PropsTypes = {
  closeModal: () => void;
  headingText: string;
  children: ReactNode;
  isVisible: boolean;
};

export const ListModal = ({ closeModal, headingText, children, isVisible }: PropsTypes) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop closeModal={closeModal}>
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className={styles.container}>
            <h3 className={styles.heading}>{headingText}</h3>
            <ReactFocusLock>
              <ModalCloseButton onClose={closeModal} />
              <ul className={styles.list}>{children}</ul>
            </ReactFocusLock>
          </motion.div>
        </ModalBackdrop>
      )}
    </AnimatePresence>
  );
};
