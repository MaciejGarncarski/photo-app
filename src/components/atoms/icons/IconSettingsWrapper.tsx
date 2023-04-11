import { IconSettings } from '@tabler/icons-react';

import styles from './Icons.module.scss';

type PropsTypes = {
  size?: 'sm' | 'lg' | 'xl';
};

export const IconSettingsWrapper = ({ size }: PropsTypes) => {
  if (size) {
    return <IconSettings className={styles[size]} />;
  }
  return <IconSettings />;
};
