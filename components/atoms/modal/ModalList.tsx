import styles from './modal.module.scss';

import { Children } from '@/components/Layout/Layout';

export const ModalList = ({ children }: Children) => {
  return <ul className={styles.list}>{children}</ul>;
};
