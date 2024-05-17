import { AnimatePresence, type Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ReactNode } from 'react';

import styles from './list-modal-item.module.scss';

type Props = {
  icon: ReactNode;
  children: ReactNode;
  loadingText?: string;
};

type WithButton = {
  type: 'button';
  href?: never;
  onClick: () => void;
  disabled?: boolean;
};

type WithLink = {
  type: 'link';
  href: string;
  onClick?: () => void;
  disabled?: never;
};

type ModalListItemConditionalProps = WithButton | WithLink;

type ModalListItemProps = Props & ModalListItemConditionalProps;

const itemVariants: Variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const animationProps = {
  variants: itemVariants,
  initial: 'initial',
  animate: 'visible',
  exit: 'exit',
};

export const ListModalItem = ({
  type,
  icon,
  children,
  disabled,
  href,
  onClick,
}: ModalListItemProps) => {
  return (
    <li className={styles.item}>
      <AnimatePresence mode="wait">
        {type === 'button' && (
          <motion.button
            {...animationProps}
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={styles.content}
          >
            {icon}
            {children}
          </motion.button>
        )}
        {type === 'link' && (
          <Link href={href} className={styles.content} onClick={onClick}>
            {icon}
            {children}
          </Link>
        )}
      </AnimatePresence>
    </li>
  );
};
