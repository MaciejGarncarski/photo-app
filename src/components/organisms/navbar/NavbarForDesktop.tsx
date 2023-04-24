import { useIsMobile } from '@/src/hooks/useIsMobile';

import { NavButtons } from '@/src/components/organisms/navButtons/NavButtons';

import styles from './Navbar.module.scss';

export const NavbarForDesktop = () => {
  const { isMobile } = useIsMobile();

  if (isMobile === 'loading' || isMobile) {
    return null;
  }

  return (
    <nav className={styles.navDesktop}>
      <NavButtons />
    </nav>
  );
};
