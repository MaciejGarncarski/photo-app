import { useIsMobile } from '@/src/hooks/use-is-mobile';

import { NavButtons } from '@/src/components/navbar/navbar-buttons/navbar-buttons';

import styles from './navbar.module.scss';

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
