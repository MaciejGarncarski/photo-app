'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { useAuth } from '@/src/hooks/use-auth';
import { useIsMobile } from '@/src/hooks/use-is-mobile';

import { Avatar } from '@/src/components/avatar/avatar';
import { navbarVariants } from '@/src/components/navbar/navbar.animation';
import { NavButtons } from '@/src/components/navbar/navbar-buttons/navbar-buttons';
import { Settings } from '@/src/components/settings/settings';
import { useSettingsAtom } from '@/src/components/settings/use-settings-atom';

import styles from './navbar.module.scss';

export const Navbar = () => {
  const { isMobile } = useIsMobile();
  const { sessionUser, isPending } = useAuth();
  const { isSettingsOpen, setSettingsOpen } = useSettingsAtom();

  const showUserOptions = !isMobile && sessionUser?.id && !isPending;

  if (isMobile === 'loading') {
    return null;
  }

  if (isMobile) {
    return (
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className={styles.navbar}
      >
        <NavButtons />
        <Settings
          isVisible={isSettingsOpen}
          closeSettingsModal={() => setSettingsOpen(false)}
        />
      </motion.nav>
    );
  }

  return (
    <nav className={styles.navbarDesktop}>
      <h1 className={styles.heading}>
        <Link href="/">Photo App</Link>
      </h1>
      <NavButtons />
      {showUserOptions && (
        <div className={styles.signedInInfo}>
          <div className={styles.info}>
            <Avatar userId={sessionUser.id} size="xs" />
            <span className={styles.userNameInfo}>
              <span className={styles.name}>{sessionUser.name}</span>
              <span className={styles.username}>@{sessionUser.username}</span>
            </span>
          </div>
        </div>
      )}
      <Settings
        isVisible={isSettingsOpen}
        closeSettingsModal={() => setSettingsOpen(false)}
      />
    </nav>
  );
};
