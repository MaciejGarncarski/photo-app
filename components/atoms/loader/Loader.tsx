import { IconLoader2 } from '@tabler/icons';
import clsx from 'clsx';

import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

import styles from './loader.module.scss';

type PropsTypes = {
  variant?: 'margin-top';
};

export const Loader = ({ variant }: PropsTypes) => {
  return (
    <span className={clsx(variant && styles[variant], styles.loading)}>
      <IconLoader2 />
      <VisuallyHiddenText text="Loading" />
    </span>
  );
};
