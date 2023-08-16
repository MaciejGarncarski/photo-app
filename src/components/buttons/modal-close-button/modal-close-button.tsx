import { IconX } from '@tabler/icons-react';
import clsx from 'clsx';

import styles from './modal-close-button.module.scss';

type Props = {
  onClose: () => void;
  outside?: boolean;
};

export const ModalCloseButton = ({ onClose, outside }: Props) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <button
      data-cy="modal close"
      className={clsx(
        outside && styles.closeButtonExternal,
        styles.closeButton,
      )}
      type="button"
      onClick={handleClose}
    >
      <IconX />
      <span className="visually-hidden">close modal</span>
    </button>
  );
};