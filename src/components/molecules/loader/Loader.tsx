import { IconLoader2 } from '@tabler/icons-react';
import clsx from 'clsx';

import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import styles from './Loader.module.scss';

type PropsTypes = {
  size: 'small' | 'normal';
  color: 'white' | 'blue';
  marginTop?: boolean;
};

export const Loader = ({ size, color, marginTop }: PropsTypes) => {
  return (
    <span
      className={clsx(
        marginTop && styles.marginTop,
        styles[color],
        styles[size],
        styles.loading,
      )}
      aria-busy="true"
      aria-live="polite"
    >
      <IconLoader2 />
      <VisuallyHidden>Loading</VisuallyHidden>
    </span>
  );
};
