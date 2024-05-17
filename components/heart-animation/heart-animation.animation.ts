import type { Variants } from 'framer-motion';

export const heartVariants: Variants = {
  initial: {
    scale: 0.3,
  },
  animate: {
    scale: 1,
    transition: {
      type: 'spring',
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};
