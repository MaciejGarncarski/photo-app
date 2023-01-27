import { m } from 'framer-motion';

import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';

import styles from './modal.module.scss';

type ModalCloseProps = {
  onClose: () => void;
};

export const ModalClose = ({ onClose }: ModalCloseProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <m.button
      whileHover={{ scale: 1.1 }}
      whileFocus={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={styles.closeButton}
      type="button"
      onClick={handleClose}
    >
      <IconXWrapper size="sm" />
      <span className="visually-hidden">Close dialog</span>
    </m.button>
  );
};
