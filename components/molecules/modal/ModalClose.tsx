import clsx from 'clsx';

import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

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
      <VisuallyHiddenText text="Close modal" />
    </button>
  );
};
