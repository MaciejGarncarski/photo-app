import { MouseEvent, useEffect, useRef } from 'react';

import styles from './modalOverlay.module.scss';

import { Children } from '@/components/Layout/Layout';

type ModalOvelayProps = {
  setOpen: (isOpen: boolean) => void;
} & Children;

export const ModalOvelay = ({ children, setOpen }: ModalOvelayProps) => {
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

  return (
    <div ref={overlayRef} onClick={handleOverlayClick} className={styles.overlay}>
      {children}
    </div>
  );
};
