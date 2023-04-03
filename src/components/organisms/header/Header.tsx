import { IconDotsVertical } from '@tabler/icons-react';
import Link from 'next/link';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useScreenWidth } from '@/src/hooks/useScreenWidth';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';

import { Navbar } from '@/src/components/organisms/navbar/Navbar';
import { NavbarForDesktop } from '@/src/components/organisms/navbar/NavbarForDesktop';
import { Settings } from '@/src/components/organisms/settings/Settings';

import styles from './header.module.scss';

export const Header = () => {
  const { isMobile } = useScreenWidth();
  const { sessionUserData, isSignedIn } = useAuth();
  const { closeModal, isModalOpen, openModal } = useModal();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.anchor}>
        <h1 className={styles.heading}>PhotoApp</h1>
      </Link>
      <NavbarForDesktop />
      <Navbar />
      {!isMobile && !sessionUserData.isLoading && (
        <div className={styles.options}>
          {isSignedIn && (
            <>
              <button type="button" className={styles.button} onClick={isModalOpen ? closeModal : openModal}>
                <Avatar userId={sessionUserData.id} size="small" />
                <span className={styles.userInfo}>
                  <span className={styles.name}>{sessionUserData.name}</span>
                  <span className={styles.username}>@{sessionUserData.username}</span>
                </span>

                <span className={styles.icon}>
                  <IconDotsVertical />
                </span>
              </button>
              <Settings isVisible={isModalOpen} closeModal={closeModal} />
            </>
          )}
        </div>
      )}
    </header>
  );
};
