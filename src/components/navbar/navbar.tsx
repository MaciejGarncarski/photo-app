import { motion } from 'framer-motion';

import { useIsMobile } from '@/src/hooks/useIsMobile';

import { navbarVariants } from '@/src/components/organisms/navbar/Navbar.animation';
import { NavButtons } from '@/src/components/organisms/navButtons/NavButtons';

import styles from './Navbar.module.scss';

export const Navbar = () => {
  const { isMobile } = useIsMobile();

  if (!isMobile) {
    return null;
  }

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={styles.nav}
    >
      <NavButtons />
    </motion.nav>
  );
};
