import { ReactNode, useEffect } from 'react';

import { useTheme } from '@/hooks/useTheme';

import styles from './layout.module.scss';

import { Header } from '../organisms/header/Header';

export type Children = {
  children: ReactNode;
};

type PropsTypes = Children;

export const Layout = ({ children }: PropsTypes) => {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={styles.layout}>
      <Header />
      <div>{children}</div>
    </div>
  );
};
