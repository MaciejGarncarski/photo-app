import { ReactNode } from 'react';

import styles from './VisuallyHidden.module.scss';

type PropsTypes = {
  children: ReactNode;
};

export const VisuallyHidden = ({ children }: PropsTypes) => {
  return <span className={styles.visuallyHidden}>{children}</span>;
};
