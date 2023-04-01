import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

import { tooltipVariant } from '@/components/atoms/tooltip/Tooltip.animation';

import styles from './tooltip.module.scss';

type PropsTypes = {
  content: string;
  variant: 'top' | 'bottom' | 'right' | 'left';
  children: ReactNode;
};

export const Tooltip = ({ children, content, variant }: PropsTypes) => {
  const [active, setActive] = useState(false);
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
