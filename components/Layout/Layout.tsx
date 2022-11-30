import { ReactNode } from 'react';

import styles from './layout.module.scss';

import { Header } from '@/components/organisms/header/Header';

export type Children = {
  children: ReactNode;
};

export const Layout = ({ children }: Children) => {
  return (
    <div>
      <Header />
      <div className={styles.children}>{children}</div>
    </div>
  );
};
