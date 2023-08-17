import { Variants } from 'framer-motion';

export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: '6vh',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.7,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.4,
    y: '40vh',
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.4,
    },
  },
};
