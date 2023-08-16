import { Variants } from 'framer-motion';

export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: '10vh',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
  },
};
