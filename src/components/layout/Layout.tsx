import { ReactNode } from 'react';

import { Header } from '@/src/components/organisms/header/Header';

import styles from './Layout.module.scss';

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
