import type { Variants } from 'framer-motion';

export const notificationVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  tap: {
    scale: 0.9,
  },
  hover: {
    scale: 1.07,
  },
};
