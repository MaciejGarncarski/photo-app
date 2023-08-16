'use client';

import { ReactNode } from 'react';

import { Header } from '@/src/components/header/header';

import styles from './layout.module.scss';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
