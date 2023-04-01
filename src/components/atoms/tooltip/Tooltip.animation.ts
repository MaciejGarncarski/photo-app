import { Variants } from 'framer-motion';

export const tooltipVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    transition: {
      duration: 0.1,
    },
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
