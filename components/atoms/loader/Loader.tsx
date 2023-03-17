import { IconLoader2 } from '@tabler/icons-react';
import clsx from 'clsx';

import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

import styles from './loader.module.scss';

type PropsTypes = {
  variant?: 'margin-top' | 'small';
  color?: 'white' | 'blue';
};

export const Loader = ({ variant, color }: PropsTypes) => {
  return (
    <span className={clsx(color && styles[color], variant && styles[variant], styles.loading)}>
      <IconLoader2 />
      <VisuallyHiddenText text="Loading" />
    </span>
  );
};
