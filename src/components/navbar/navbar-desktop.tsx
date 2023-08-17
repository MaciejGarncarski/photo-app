import { NavButtons } from '@/src/components/navbar/navbar-buttons/navbar-buttons';

import styles from './navbar.module.scss';

export const NavbarForDesktop = () => {
  return (
    <nav className={styles.navDesktop}>
      <NavButtons />
    </nav>
  );
};
