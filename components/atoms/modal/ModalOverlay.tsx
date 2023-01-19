import { MouseEvent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

import { Children } from '@/components/layout/Layout';

type ModalOverlayProps = {
  setOpen: (isOpen: boolean) => void;
} & Children;

export const ModalOverlay = ({ children, setOpen }: ModalOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (keyEv: KeyboardEvent) => {
      if (keyEv.key === 'Escape') {
        setOpen(false);
      }
    };
    if (!overlayRef.current) {
      return;
    }

    document.addEventListener('keydown', handleEscapeKey);
  }, [setOpen]);

  const handleOverlayClick = (mouseEv: MouseEvent) => {
    if (mouseEv.target === overlayRef.current) {
      setOpen(false);
    }
  };

  return createPortal(
    <div ref={overlayRef} onClick={handleOverlayClick} className={styles.overlay}>
      {children}
    </div>,
    document.querySelector('#modal') as HTMLElement,
  );
};
