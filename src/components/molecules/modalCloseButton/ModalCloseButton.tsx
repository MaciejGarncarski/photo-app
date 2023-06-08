import clsx from 'clsx';

import { IconXWrapper } from '@/src/components/atoms/icons/IconXWrapper';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import styles from './ModalCloseButton.module.scss';

type PropsTypes = {
  onClose: () => void;
  outside?: boolean;
};

export const ModalCloseButton = ({ onClose, outside }: PropsTypes) => {
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
      <IconXWrapper size="sm" />
      <VisuallyHidden>Close modal</VisuallyHidden>
    </button>
  );
};
