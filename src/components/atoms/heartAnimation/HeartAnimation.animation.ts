import { Variants } from 'framer-motion';

export const heartVariants: Variants = {
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
