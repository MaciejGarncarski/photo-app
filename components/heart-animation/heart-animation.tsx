import { Heart } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';

import { heartVariants } from '@/components/heart-animation/heart-animation.animation';

import styles from './heart-animation.module.scss';

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
          <Heart weight="fill" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
