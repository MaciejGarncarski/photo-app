import { motion } from 'framer-motion';
import type { MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { backdropVariants } from '@/components/modals/modal-backdrop/modal-backdrop.animation';

import styles from './modal-backdrop.module.scss';

type Props = {
  closeModal: () => void;
  children: ReactNode;
};

export const ModalBackdrop = ({ closeModal, children }: Props) => {
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
      data-backdrop
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>,
    document.body,
  );
};
