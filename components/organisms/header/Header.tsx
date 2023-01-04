import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { memo } from 'react';

import styles from './header.module.scss';

import { Children } from '@/components/Layout/Layout';
import { HeaderButtons } from '@/components/molecules/headerButtons/HeaderButtons';
import { LayoutSearch } from '@/components/molecules/layoutSearch/LayoutSearch';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';
import { useScrollPosition } from '@/components/organisms/header/useScrollPosition';

import { APP_NAME } from '@/pages';

const MemoHeaderButtons = memo(() => <HeaderButtons />);

const Nav = ({ children }: Children) => {
  const { isMobile } = useScreenWidth();
  const { isGoingUp } = useScrollPosition();

  if (isMobile) {
    return (
      <motion.nav
        animate={isGoingUp ? { y: 0 } : {}}
        initial={{ y: 70 }}
        transition={{ type: 'tween', duration: 0.2 }}
        className={clsx(styles.nav)}
      >
        {children}
      </motion.nav>
    );
  }

  return <motion.nav className={clsx(styles.nav)}>{children}</motion.nav>;
};

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.anchor}>
        <h1 className={styles.heading}>{APP_NAME}</h1>
      </Link>
      <LayoutSearch />
      <Nav>
        <MemoHeaderButtons />
      </Nav>
    </header>
  );
};
