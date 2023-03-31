import { ReactNode, useEffect } from 'react';

import { useTheme } from '@/hooks/useTheme';

import styles from './layout.module.scss';

import { Header } from '../organisms/header/Header';

type PropsTypes = {
  children: ReactNode;
};

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
