'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { useAuth } from '@/src/hooks/use-auth';
import { useIsTabletOrMobile } from '@/src/hooks/use-is-tablet-or-mobile';

import { Avatar } from '@/src/components/avatar/avatar';
import { NavButtons } from '@/src/components/navbar/navbar-buttons/navbar-buttons';
import { SettingsModal } from '@/src/components/settings-modal/settings-modal';
import { useSettingsAtom } from '@/src/components/settings-modal/use-settings-atom';

import styles from './navbar.module.scss';

export const Navbar = () => {
  const { sessionUser, isPending } = useAuth();
  const { isSettingsOpen, setSettingsOpen } = useSettingsAtom();
  const { isTabletOrMobile } = useIsTabletOrMobile();

  const showUserOptions = !isTabletOrMobile && sessionUser?.id && !isPending;

  return (
    <motion.nav
      // variants={isTabletOrMobile ? navbarVariants : {}}
      initial="hidden"
      animate="visible"
      className={styles.navbar}
    >
      <h1 className={styles.heading}>
        <Link href="/">Photo App</Link>
      </h1>
      <NavButtons />
      {showUserOptions && (
        <div className={styles.signedInInfo}>
          <div className={styles.info}>
            <Avatar userId={sessionUser.id} size="small" />
            <span className={styles.userNameInfo}>
              <span className={styles.name}>{sessionUser.name}</span>
              <span className={styles.username}>@{sessionUser.username}</span>
            </span>
          </div>
        </div>
      )}
      <SettingsModal
        isVisible={isSettingsOpen}
        closeSettingsModal={() => setSettingsOpen(false)}
      />
    </motion.nav>
  );
};
