import { ReactNode } from 'react';

import styles from './modal.module.scss';

type ModalButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
};

export const ModalButton = ({ onClick, children, disabled }: ModalButtonProps) => {
  return (
    <button type="button" className={styles.itemButton} onClick={onClick} disabled={Boolean(!onClick) || disabled}>
      {children}
    </button>
  );
};
