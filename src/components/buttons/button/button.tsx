import { IconContext } from '@phosphor-icons/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { MouseEventHandler, ReactNode } from 'react';

import { buttonVariants } from '@/src/components/buttons/button/button.animation';

import styles from './button.module.scss';

type ButtonTypes = 'button' | 'submit' | 'reset';
type Variants = 'secondary' | 'primary' | 'destructive';

type Props = {
  type?: ButtonTypes;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant: Variants;
  children: ReactNode;
};

export const Button = ({
  type = 'button',
  disabled,
  children,
  variant,
  onClick,
}: Props) => {
  return (
    <IconContext.Provider
      value={{
        size: 20,
        weight: 'bold',
      }}
    >
      <motion.button
        onClick={onClick}
        type={type}
        disabled={disabled}
        variants={buttonVariants}
        whileHover={disabled ? undefined : 'hover'}
        whileTap={disabled ? undefined : 'tap'}
        className={clsx(styles[variant], styles.button)}
      >
        {children}
      </motion.button>
    </IconContext.Provider>
  );
};
