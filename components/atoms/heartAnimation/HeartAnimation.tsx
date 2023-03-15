import { IconHeart } from '@tabler/icons';
import { motion, Variants } from 'framer-motion';

import styles from './heartAnimation.module.scss';

const variants: Variants = {
  initial: {
    scale: 0,
  },
  animate: {
    scale: 1,
    transition: {
      type: 'spring',
    },
  },
  exit: {
    scale: 0,
  },
};

export const HeartAnimation = () => {
  return (
    <motion.div className={styles.heartAnimation} variants={variants} initial="initial" animate="animate" exit="exit">
      <IconHeart />
    </motion.div>
  );
};
