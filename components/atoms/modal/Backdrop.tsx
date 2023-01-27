import clsx from 'clsx';
import { motion } from 'framer-motion';
import { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

type PropsTypes = {
  close: () => void;
  mobileCenter?: boolean;
  children: ReactNode;
};

export const Backdrop = ({ close, mobileCenter, children }: PropsTypes) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const backdropClassName = clsx(mobileCenter && styles.backdropMobileCenter, styles.backdrop);

  useEffect(() => {
    const handleEscapeKey = (keyEv: KeyboardEvent) => {
      if (keyEv.key === 'Escape') {
        close();
      }
    };
    if (!backdropRef.current) {
      return;
    }

    document.addEventListener('keydown', handleEscapeKey);
  }, [close]);

  const handleOverlayClick = (mouseEv: MouseEvent) => {
    if (mouseEv.target === backdropRef.current) {
      close();
    }
  };

  return createPortal(
    <motion.div
      ref={backdropRef}
      onClick={handleOverlayClick}
      className={backdropClassName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>,
    document.querySelector('#modal') as HTMLElement,
  );
};
