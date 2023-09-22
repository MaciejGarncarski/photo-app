import { AnimatePresence, Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

import { Loader } from '@/src/components/loader/loader';

import styles from './list-modal-item.module.scss';

type Props = {
  icon: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
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
    y: 20,
  },
  visible: {
    y: 0,
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
  isLoading,
  loadingText,
}: ModalListItemProps) => {
  return (
    <li className={styles.item}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <span className={styles.content} key="loader">
            <Loader size="small" color="primary" />
            {loadingText}
          </span>
        ) : (
          <>
            {type === 'button' && (
              <motion.button
                {...animationProps}
                type="button"
                onClick={onClick}
                disabled={disabled}
                className={styles.content}
                key="button"
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
          </>
        )}
      </AnimatePresence>
    </li>
  );
};
