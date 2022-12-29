import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useState } from 'react';

import styles from './tooltip.module.scss';

import { Children } from '@/components/Layout/Layout';
import { tooltipVariant } from '@/components/molecules/accountIcon/AccountIcon';

type TooltipProps = {
  content: string;
  variant: 'top' | 'bottom' | 'right';
} & Children;

export const Tooltip = ({ children, content, variant }: TooltipProps) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <span
      className={styles.tooltip}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
      <AnimatePresence>
        {active && (
          <motion.span
            variants={tooltipVariant}
            animate='animate'
            initial='initial'
            exit='exit'
            className={clsx(styles[variant], styles.tip)}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};
