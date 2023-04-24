import { Variants } from 'framer-motion';

export const alertVariants: Variants = {
  opened: {
    scale: 1,
    opacity: 1,
    y: 0,
  },
  closed: {
    scale: 0,
    opacity: 0,
    y: -100,
  },
  exit: {
    scale: 0.6,
    opacity: 0,
  },
};
