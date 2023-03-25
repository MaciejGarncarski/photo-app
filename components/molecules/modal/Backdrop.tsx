import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

type PropsTypes = {
  close: () => void;
  mobileCenter?: boolean;
  children: ReactNode;
};

const backdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const Backdrop = ({ close, mobileCenter, children }: PropsTypes) => {
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
      className={backdropClassName}
      onKeyDown={handleEscapeKey}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      data-testid="backdrop"
    >
      {children}
    </motion.div>,
    document.querySelector('#modal') as HTMLDivElement,
  );
};
