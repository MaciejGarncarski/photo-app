import { IconX } from '@tabler/icons-react';

import styles from './modal-close-button.module.scss';

type Props = {
  onClose: () => void;
};

export const ModalCloseButton = ({ onClose }: Props) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <button
      data-cy="modal close"
      className={styles.closeButton}
      type="button"
      onClick={handleClose}
    >
      <IconX size={20} />
      <span className="visually-hidden">close modal</span>
    </button>
  );
};
