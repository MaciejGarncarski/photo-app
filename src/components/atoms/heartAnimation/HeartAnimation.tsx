import { IconHeart } from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';

import { heartVariants } from '@/src/components/atoms/heartAnimation/HeartAnimation.animation';

import styles from './heartAnimation.module.scss';

type Props = {
  isVisible: boolean;
};

export const HeartAnimation = ({ isVisible }: Props) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={styles.heartAnimation}
          variants={heartVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <IconHeart />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
