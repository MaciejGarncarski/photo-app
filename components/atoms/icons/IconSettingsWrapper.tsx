import { IconMenu2 } from '@tabler/icons';

import styles from './icons.module.scss';

type PropsTypes = {
  size?: 'lg' | 'xl';
};

export const IconSettingsWrapper = ({ size }: PropsTypes) => {
  if (size) {
    return <IconMenu2 className={styles[size]} />;
  }
  return <IconMenu2 />;
};
