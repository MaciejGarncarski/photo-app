import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { MouseEvent, ReactNode, useEffect, useRef } from 'react';

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
  const backdropRef = useRef<HTMLDivElement>(null);
  const backdropClassName = clsx(mobileCenter && styles.backdropMobileCenter, styles.backdrop);

  useEffect(() => {
    const handleEscapeKey = (keyEv: KeyboardEvent) => {
      if (keyEv.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
  }, [close]);

  const handleOverlayClick = (mouseEv: MouseEvent) => {
    if (mouseEv.target === backdropRef.current) {
      close();
    }
  };

  return (
    <motion.div
      ref={backdropRef}
      onClick={handleOverlayClick}
      className={backdropClassName}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
