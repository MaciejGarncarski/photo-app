import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import styles from './button.module.scss';

import { Children } from '@/components/Layout/Layout';

type ButtonProps = {
  className?: string;
  disabled?: boolean;
  variant?: 'secondary' | false;
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
  ...rest
}: ButtonProps) => {
  return (
    <button
      onKeyDown={onKeyDown}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(variant && styles[`button-${variant}`], className, styles.button)}
      {...rest}
    >
      {children}
    </button>
  );
};
