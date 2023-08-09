import clsx from 'clsx';
import { motion } from 'framer-motion';
import { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { backdropVariants } from '@/src/components/modals/modal-backdrop/modal-backdrop.animation';

import styles from './modal-backdrop.module.scss';

type PropsTypes = {
  closeModal: () => void;
  mobileCenter?: boolean;
  children: ReactNode;
};

export const ModalBackdrop = ({
  closeModal,
  mobileCenter,
  children,
}: PropsTypes) => {
  const backdropClassName = clsx(
    mobileCenter && styles.backdropMobileCenter,
    styles.backdrop,
  );

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
      className={backdropClassName}
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
