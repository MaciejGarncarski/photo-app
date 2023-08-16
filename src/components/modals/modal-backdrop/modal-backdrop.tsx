import { motion } from 'framer-motion';
import { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { backdropVariants } from '@/src/components/modals/modal-backdrop/modal-backdrop.animation';

import styles from './modal-backdrop.module.scss';

type Props = {
  closeModal: () => void;
  children: ReactNode;
};

export const ModalBackdrop = ({ closeModal, children }: Props) => {
  const handleEscapeKey = (keyEv: KeyboardEvent) => {
    if (keyEv.key !== 'Escape') {
      return;
    }
    closeModal();
  };

  const handleOverlayClick = (mouseEv: MouseEvent) => {
    if (mouseEv.target === mouseEv.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <motion.div
      onClick={handleOverlayClick}
      variants={backdropVariants}
      className={styles.backdrop}
      onKeyDown={handleEscapeKey}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>,
    document.body,
  );
};
