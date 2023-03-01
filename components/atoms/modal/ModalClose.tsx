import clsx from 'clsx';

import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

import styles from './modal.module.scss';

type PropsTypes = {
  onClose: () => void;
  isExternal?: boolean;
};

export const ModalClose = ({ onClose, isExternal }: PropsTypes) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <button
      className={clsx(isExternal && styles.closeButtonExternal, styles.closeButton)}
      type="button"
      onClick={handleClose}
    >
      <IconXWrapper size="sm" />
      <VisuallyHiddenText text="Close modal" />
    </button>
  );
};
