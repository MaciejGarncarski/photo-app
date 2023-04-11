import clsx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonTypes = 'button' | 'submit' | 'reset';
type Variants = 'secondary' | 'primary';

type PropsTypes = {
  type: ButtonTypes;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant: Variants;
  children: ReactNode;
};

export const Button = ({ type = 'button', disabled, children, variant, onClick }: PropsTypes) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled} className={clsx(styles[variant], styles.button)}>
      {children}
    </button>
  );
};
