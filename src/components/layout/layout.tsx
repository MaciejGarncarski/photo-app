import { ReactNode } from 'react';

import { Header } from '@/src/components/header/header';

import styles from './layout.module.scss';

type PropsTypes = {
  children: ReactNode;
};

export const Layout = ({ children }: PropsTypes) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
