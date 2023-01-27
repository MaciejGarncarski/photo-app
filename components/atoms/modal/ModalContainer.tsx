import { AnimatePresence } from 'framer-motion';

import { Children } from '@/components/layout/Layout';

export const ModalContainer = ({ children }: Children) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      {children}
    </AnimatePresence>
  );
};
