import { useIsMobile } from '@/src/hooks/useIsMobile';

import styles from './navbar.module.scss';

import { NavButtons } from '../navButtons/NavButtons';

export const NavbarForDesktop = () => {
  const { isMobile } = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <nav className={styles.navDesktop}>
      <NavButtons />
    </nav>
  );
};
