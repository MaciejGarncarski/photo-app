import { useScreenWidth } from '@/hooks/useScreenWidth';

import styles from './navbar.module.scss';

import { NavButtons } from '../navButtons/NavButtons';

export const NavbarForDesktop = () => {
  const { isMobile } = useScreenWidth();

  if (isMobile) {
    return null;
  }

  return (
    <nav className={styles.navDesktop}>
      <NavButtons />
    </nav>
  );
};
