import { IconSettings } from '@tabler/icons';

import styles from './icons.module.scss';

type PropsTypes = {
  size?: 'lg' | 'xl';
};

export const IconSettingsWrapper = ({ size }: PropsTypes) => {
  if (size) {
    return <IconSettings className={styles[size]} />;
  }
  return <IconSettings />;
};
