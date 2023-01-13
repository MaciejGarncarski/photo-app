import { ReactNode } from 'react';

import styles from './modal.module.scss';

type ModalButtonProps = {
  onClick?: () => void;
  children: ReactNode;
};

export const ModalButton = ({ onClick, children }: ModalButtonProps) => {
  return (
    <button type="button" className={styles.itemButton} onClick={onClick} disabled={Boolean(!onClick)}>
      {children}
    </button>
  );
};
