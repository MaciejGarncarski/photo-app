import { Variants } from 'framer-motion';

const itemVariant: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};

export const animation = {
  variants: itemVariant,
  initial: 'hidden',
  animate: 'visible',
};
