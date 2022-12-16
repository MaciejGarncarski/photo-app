import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';

import styles from './header.module.scss';

import { HeaderButtons } from '@/components/molecules/headerButtons/HeaderButtons';
import { LayoutSearch } from '@/components/molecules/layoutSearch/LayoutSearch';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';
import { useScrollPosition } from '@/components/organisms/header/useScrollPosition';

import { APP_NAME } from '@/pages';

export const Header = () => {
  const { isGoingUp } = useScrollPosition();
  const { isMobile } = useScreenWidth();

  //TODO nav animation
  return (
    <header className={styles.header}>
      <Link href='/' className={styles.anchor}>
        <h1 className={styles.heading}>{APP_NAME}</h1>
      </Link>
      <LayoutSearch />
      <motion.nav
        animate={isMobile && isGoingUp ? { y: 0 } : {}}
        initial={isMobile ? { y: 70 } : {}}
        transition={{ type: 'tween', duration: 0.2 }}
        className={clsx(styles.nav)}
      >
        <HeaderButtons />
      </motion.nav>
    </header>
  );
};
