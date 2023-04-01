import { motion } from 'framer-motion';

import { useScreenWidth } from '@/hooks/useScreenWidth';

import { navbarVariants } from '@/components/molecules/navbar/Navbar.animation';
import { NavButtons } from '@/components/molecules/navButtons/NavButtons';

import styles from './navbar.module.scss';

export const Navbar = () => {
  const { isMobile } = useScreenWidth();

  if (!isMobile) {
    return null;
  }

  return (
    <motion.nav variants={navbarVariants} initial="hidden" animate="visible" className={styles.nav}>
      <NavButtons />
    </motion.nav>
  );
};
