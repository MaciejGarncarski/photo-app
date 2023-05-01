import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { opacityVariants } from '@/src/utils/common.animation';

type PageTransitionProps = { children: ReactNode };

export const AnimatedPage = ({ children }: PageTransitionProps) => {
  return (
    <motion.div variants={opacityVariants} initial="hidden" exit="exit" animate="visible">
      {children}
    </motion.div>
  );
};
