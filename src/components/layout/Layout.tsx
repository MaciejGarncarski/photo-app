import { ReactNode } from 'react';

import styles from './layout.module.scss';

import { Header } from '../organisms/header/Header';

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
