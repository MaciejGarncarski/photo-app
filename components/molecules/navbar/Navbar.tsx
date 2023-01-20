import clsx from 'clsx';
import { m } from 'framer-motion';

import styles from './navbar.module.scss';

import { NavButtons } from '@/components/molecules/navButtons/NavButtons';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';
import { useScrollPosition } from '@/components/organisms/header/useScrollPosition';

export const Navbar = () => {
  const { isMobile } = useScreenWidth();
  const { isGoingUp } = useScrollPosition();

  if (isMobile) {
    return (
      <m.nav
        animate={isGoingUp ? { y: 0 } : {}}
        initial={{ y: 70 }}
        transition={{ type: 'tween', duration: 0.2 }}
        className={clsx(styles.nav)}
      >
        <NavButtons />
      </m.nav>
    );
  }

  return (
    <m.nav className={clsx(styles.nav)}>
      <NavButtons />
    </m.nav>
  );
};
