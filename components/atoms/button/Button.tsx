import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import { Children } from '@/components/layout/Layout';

import styles from './button.module.scss';

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  variant?: 'secondary';
} & Children &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  type = 'button',
  disabled,
  children,
  variant,
  onClick,
  className,
  onKeyDown,
}: ButtonProps) => {
  return (
    <button
      onKeyDown={onKeyDown}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(variant && styles[`button-${variant}`], className, styles.button)}
    >
      {children}
    </button>
  );
};
