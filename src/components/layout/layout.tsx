'use client';

import { ReactNode } from 'react';

import { Navbar } from '@/src/components/navbar/navbar';

import styles from './layout.module.scss';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
