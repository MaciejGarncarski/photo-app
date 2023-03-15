import { IconHeart } from '@tabler/icons';
import { motion } from 'framer-motion';

import styles from './heartAnimation.module.scss';

export const HeartAnimation = () => {
  return (
    <motion.div
      className={styles.heartAnimation}
      initial={{ scale: 0 }}
      animate={{ scale: 1, transition: { type: 'spring' } }}
      exit={{ scale: 0 }}
    >
      <IconHeart />
    </motion.div>
  );
};
