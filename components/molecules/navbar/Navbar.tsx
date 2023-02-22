import { motion, Variants } from 'framer-motion';

import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useScrollPosition } from '@/hooks/useScrollPosition';

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
  const { isGoingUp } = useScrollPosition();

  if (!isMobile) {
    return null;
  }

  return (
    <motion.nav
      variants={navbarVariants}
      initial="hidden"
      animate={isGoingUp ? 'visible' : 'hidden'}
      className={styles.nav}
    >
      <NavButtons />
    </motion.nav>
  );
};
