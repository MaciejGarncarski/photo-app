import clsx from 'clsx';
import { motion } from 'framer-motion';

import { NavButtons } from '@/components/molecules/navButtons/NavButtons';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';
import { useScrollPosition } from '@/components/organisms/header/useScrollPosition';

import styles from './navbar.module.scss';

export const Navbar = () => {
  const { isMobile } = useScreenWidth();
  const { isGoingUp } = useScrollPosition();

  if (isMobile) {
    return (
      <motion.nav
        animate={isGoingUp ? { y: 0 } : { y: 70 }}
        initial={{ y: 70 }}
        transition={{ type: 'tween', duration: 0.2 }}
        className={clsx(styles.nav)}
      >
        <NavButtons />
      </motion.nav>
    );
  }

  return (
    <nav className={clsx(styles.nav)}>
      <NavButtons />
    </nav>
  );
};
