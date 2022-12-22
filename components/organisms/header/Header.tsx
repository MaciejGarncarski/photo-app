import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useStore } from '@/lib/useStore';

import styles from './header.module.scss';

import { HeaderButtons } from '@/components/molecules/headerButtons/HeaderButtons';
import { LayoutSearch } from '@/components/molecules/layoutSearch/LayoutSearch';

import { APP_NAME } from '@/pages';

export const Header = () => {
  const isMobile = useStore((state) => state.isMobile);
  const isGoingUp = useStore((state) => state.isGoingUp);

  return (
    <header className={styles.header}>
      <Link href='/' className={styles.anchor}>
        <h1 className={styles.heading}>{APP_NAME}</h1>
      </Link>
      <LayoutSearch />
      <motion.nav
        animate={isGoingUp ? { y: 0 } : {}}
        initial={isMobile ? { y: 70 } : { y: 0 }}
        transition={{ type: 'tween', duration: 0.2 }}
        className={clsx(styles.nav)}
      >
        <HeaderButtons />
      </motion.nav>
    </header>
  );
};
