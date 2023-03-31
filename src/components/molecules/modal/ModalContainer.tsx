import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type PropsTypes = {
  children: ReactNode;
};

export const ModalContainer = ({ children }: PropsTypes) => {
  return (
    <AnimatePresence initial={false} mode="wait">
      {children}
    </AnimatePresence>
  );
};
