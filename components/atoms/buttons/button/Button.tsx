import clsx from 'clsx';
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
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(className, variant && styles[`button-${variant}`], styles.button)}
    >
      {children}
    </button>
  );
};
