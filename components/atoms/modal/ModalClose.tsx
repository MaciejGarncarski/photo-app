import { motion } from 'framer-motion';

import styles from './modal.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';

type ModalCloseProps = {
  onClose: () => void;
};

export const ModalClose = ({ onClose }: ModalCloseProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileFocus={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={styles.closeButton}
      type="button"
      onClick={onClose}
    >
      <Icon.Close />
      <span className="visually-hidden">Close dialog</span>
    </motion.button>
  );
};
