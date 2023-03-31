import { IconLoader2 } from '@tabler/icons-react';
import clsx from 'clsx';

import { VisuallyHidden } from '@/components/atoms/visuallyHiddenText/VisuallyHidden';

import styles from './loader.module.scss';

type PropsTypes = {
  variant?: 'margin-top' | 'small';
  color?: 'white' | 'blue';
};

export const Loader = ({ variant, color }: PropsTypes) => {
  return (
    <span
      className={clsx(color && styles[color], variant && styles[variant], styles.loading)}
      aria-busy="true"
      aria-live="polite"
    >
      <IconLoader2 />
      <VisuallyHidden>Loading</VisuallyHidden>
    </span>
  );
};
