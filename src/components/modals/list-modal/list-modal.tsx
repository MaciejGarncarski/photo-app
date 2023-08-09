import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import ReactFocusLock from 'react-focus-lock';

import { ModalCloseButton } from '@/src/components/buttons/modal-close-button/modal-close-button';
import { ModalBackdrop } from '@/src/components/modals/modal-backdrop/modal-backdrop';

import styles from './list-modal.module.scss';

import { listModalVariants } from './list-modal.animation';

type PropsTypes = {
  closeModal: () => void;
  headingText: string;
  children: ReactNode;
  isVisible: boolean;
};

export const ListModal = ({
  closeModal,
  headingText,
  children,
  isVisible,
  ...rest
}: PropsTypes) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <ModalBackdrop closeModal={closeModal}>
          <motion.div
            initial="closed"
            animate="opened"
            exit="exit"
            variants={listModalVariants}
            className={styles.container}
            {...rest}
          >
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
