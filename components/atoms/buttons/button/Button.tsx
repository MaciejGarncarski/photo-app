import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

import { Children } from '@/components/layout/Layout';

import styles from './button.module.scss';

type PropsTypes = {
  className?: string;
  disabled?: boolean;
  variant?: 'secondary';
} & Children &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ type = 'button', disabled, children, variant, onClick, className }: PropsTypes) => {
  return (
    <motion.button
      onClick={onClick}
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      disabled={disabled}
      className={clsx(className, variant && styles[`button-${variant}`], styles.button)}
    >
      {children}
    </motion.button>
  );
};
