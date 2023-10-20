'use client';

import { motion } from 'framer-motion';

import { useIsMobile } from '@/src/hooks/use-is-mobile';

import { navbarVariants } from '@/src/components/navbar/navbar.animation';
import { NavButtons } from '@/src/components/navbar/navbar-buttons/navbar-buttons';

import styles from './navbar.module.scss';

export const Navbar = () => {
  const { isMobile } = useIsMobile();

  if (isMobile === 'loading') {
    return (
      <nav className={styles.nav}>
        <NavButtons />
      </nav>
    );
  }

  return (
    <motion.nav
      variants={isMobile ? navbarVariants : {}}
      initial="hidden"
      animate="visible"
      className={styles.nav}
    >
      <NavButtons />
    </motion.nav>
  );
};
