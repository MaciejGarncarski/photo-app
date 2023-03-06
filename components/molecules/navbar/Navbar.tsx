import { motion, Variants } from 'framer-motion';

import { useScreenWidth } from '@/hooks/useScreenWidth';

import { NavButtons } from '@/components/molecules/navButtons/NavButtons';

import styles from './navbar.module.scss';

const navbarVariants: Variants = {
  hidden: {
    y: 70,
  },
  visible: {
    y: 0,
  },
};

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
