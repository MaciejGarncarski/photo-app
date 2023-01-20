import { m } from 'framer-motion';

import styles from './modal.module.scss';

import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';

type ModalCloseProps = {
  onClose: () => void;
};

export const ModalClose = ({ onClose }: ModalCloseProps) => {
  return (
    <m.button
      whileHover={{ scale: 1.1 }}
      whileFocus={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={styles.closeButton}
      type="button"
      onClick={onClose}
    >
      <IconXWrapper size="lg" />
      <span className="visually-hidden">Close dialog</span>
    </m.button>
  );
};
