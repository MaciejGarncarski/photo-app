import { motion } from 'framer-motion';

import { useScreenWidth } from '@/src/hooks/useScreenWidth';

import { navbarVariants } from '@/src/components/organisms/navbar/Navbar.animation';
import { NavButtons } from '@/src/components/organisms/navButtons/NavButtons';

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
