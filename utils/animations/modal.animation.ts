import { Variants } from 'framer-motion';

export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.2,
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.25,
    },
  },
};
