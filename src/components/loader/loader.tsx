import { IconLoader2 } from '@tabler/icons-react';
import clsx from 'clsx';

import styles from './loader.module.scss';

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
      <span className="visually-hidden">Loading</span>
    </span>
  );
};
