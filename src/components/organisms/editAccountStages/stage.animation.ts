import { Variants } from 'framer-motion';

export const stageVariant: Variants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { scale: 0.7, opacity: 0 },
};
