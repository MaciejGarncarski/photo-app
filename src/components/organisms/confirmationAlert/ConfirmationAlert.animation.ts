import { Variants } from 'framer-motion';

export const alertVariants: Variants = {
  opened: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: -150,
  },
  exit: {
    opacity: 0,
  },
};
