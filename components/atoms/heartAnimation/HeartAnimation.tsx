import { IconHeart } from '@tabler/icons';
import { motion } from 'framer-motion';

import styles from './heartAnimation.module.scss';

export const HeartAnimation = () => {
  return (
    <motion.div
      className={styles.heartAnimation}
      initial={{ scale: 0 }}
      animate={{ scale: [0.5, 1.5, 1], transition: { type: 'tween', duration: 0.5 } }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <IconHeart />
    </motion.div>
  );
};
