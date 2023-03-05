import { IconLoader2 } from '@tabler/icons';

import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

import styles from './loader.module.scss';

export const Loader = () => {
  return (
    <span className={styles.loading}>
      <IconLoader2 />
      <VisuallyHiddenText text="Loading" />
    </span>
  );
};
