import { ReactNode } from 'react';

import styles from './visuallyHidden.module.scss';

type PropsTypes = {
  children: ReactNode;
};

export const VisuallyHidden = ({ children }: PropsTypes) => {
  return <span className={styles.visuallyHidden}>{children}</span>;
};
