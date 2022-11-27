import clsx from 'clsx';

import styles from './button.module.scss';

import { Children } from '@/components/Layout/Layout';

type ButtonProps = {
  type?: 'reset' | 'submit' | 'button';
  className?: string;
  disabled?: boolean;
  variant?: 'secondary';
  onClick?: () => void;
} & Children;

export const Button = ({
  type = 'button',
  disabled,
  children,
  variant,
  onClick,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(variant && styles[`button-${variant}`], className, styles.button)}
    >
      {children}
    </button>
  );
};
