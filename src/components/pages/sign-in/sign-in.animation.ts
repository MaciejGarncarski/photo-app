import { Variants } from 'framer-motion';

const itemVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

export const animation = {
  variants: itemVariant,
  initial: 'hidden',
  animate: 'visible',
};
