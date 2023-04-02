import clsx from 'clsx';
import { motion } from 'framer-motion';
import { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { backdropVariants } from '@/src/components/atoms/modalBackdrop/ModalBackdrop.animation';

import styles from './modalBackdrop.module.scss';

type PropsTypes = {
  close: () => void;
  mobileCenter?: boolean;
  children: ReactNode;
};

export const ModalBackdrop = ({ close, mobileCenter, children }: PropsTypes) => {
  const backdropClassName = clsx(mobileCenter && styles.backdropMobileCenter, styles.backdrop);

  const handleEscapeKey = (keyEv: KeyboardEvent) => {
    if (keyEv.key !== 'Escape') {
      return;
    }
    close();
  };

  const handleOverlayClick = (mouseEv: MouseEvent) => {
    if (mouseEv.target === mouseEv.currentTarget) {
      close();
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
    document.querySelector('#modal') as HTMLDivElement,
  );
};
