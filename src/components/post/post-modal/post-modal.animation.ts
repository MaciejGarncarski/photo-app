import { Variants } from 'framer-motion';

export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
};
