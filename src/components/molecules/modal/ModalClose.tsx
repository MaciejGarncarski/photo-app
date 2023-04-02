import clsx from 'clsx';

import { IconXWrapper } from '@/src/components/atoms/icons/IconXWrapper';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import styles from './modal.module.scss';

type PropsTypes = {
  onClose: () => void;
  outside?: boolean;
};

export const ModalClose = ({ onClose, outside }: PropsTypes) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <button
      className={clsx(outside && styles.closeButtonExternal, styles.closeButton)}
      type="button"
      onClick={handleClose}
    >
      <IconXWrapper size="sm" />
      <VisuallyHidden>Close modal</VisuallyHidden>
    </button>
  );
};
