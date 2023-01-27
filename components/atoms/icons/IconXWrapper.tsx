import { IconX } from '@tabler/icons';

import styles from './icons.module.scss';

type PropsTypes = {
  size?: 'sm' | 'lg' | 'xl';
};

export const IconXWrapper = ({ size }: PropsTypes) => {
  if (size) {
    return <IconX className={styles[size]} />;
  }
  return <IconX />;
};
