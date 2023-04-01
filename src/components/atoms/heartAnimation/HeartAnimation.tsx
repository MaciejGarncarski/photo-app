import { IconHeart } from '@tabler/icons-react';
import { motion } from 'framer-motion';

import { heartVariants } from '@/components/atoms/heartAnimation/HeartAnimation.animation';

import styles from './heartAnimation.module.scss';

export const HeartAnimation = () => {
  return (
    <motion.div
      className={styles.heartAnimation}
      variants={heartVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <IconHeart />
    </motion.div>
  );
};
