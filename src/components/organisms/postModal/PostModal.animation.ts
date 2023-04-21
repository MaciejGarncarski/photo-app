import { Variants } from 'framer-motion';

export const modalVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: { y: 0, opacity: 1 },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
};
