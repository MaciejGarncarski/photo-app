import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { memo } from 'react';

import { isGoingUpAtom, isMobileAtom } from '@/lib/state/scrollPos';

import styles from './header.module.scss';

import { Children } from '@/components/Layout/Layout';
import { HeaderButtons } from '@/components/molecules/headerButtons/HeaderButtons';
import { LayoutSearch } from '@/components/molecules/layoutSearch/LayoutSearch';

import { APP_NAME } from '@/pages';

const MemoHeaderButtons = memo(() => <HeaderButtons />);

const Nav = ({ children }: Children) => {
  const [isMobile] = useAtom(isMobileAtom);
  const [isGoingUp] = useAtom(isGoingUpAtom);

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
      <Link href='/' className={styles.anchor}>
        <h1 className={styles.heading}>{APP_NAME}</h1>
      </Link>
      <LayoutSearch />
      <Nav>
        <MemoHeaderButtons />
      </Nav>
    </header>
  );
};
