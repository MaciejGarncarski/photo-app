import clsx from 'clsx';
import { AnimatePresence, Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { Children } from '@/components/layout/Layout';

import styles from './tooltip.module.scss';

type PropsTypes = {
  content: string;
  variant: 'top' | 'bottom' | 'right' | 'left';
} & Children;

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

export const Tooltip = ({ children, content, variant }: PropsTypes) => {
  const [active, setActive] = useState<boolean>(false);

  const show = () => setActive(true);
  const close = () => setActive(false);

  return (
    <span className={styles.tooltip} onBlur={close} onFocus={show} onMouseEnter={show} onMouseLeave={close}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.span
            variants={tooltipVariant}
            animate="animate"
            initial="initial"
            exit="exit"
            className={clsx(styles[variant], styles.tip)}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
