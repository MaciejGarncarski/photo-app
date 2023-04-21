import { IconDotsVertical } from '@tabler/icons-react';
import Link from 'next/link';

import { useAuth } from '@/src/hooks/useAuth';
import { useIsMobile } from '@/src/hooks/useIsMobile';
import { useModal } from '@/src/hooks/useModal';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';

import { Navbar } from '@/src/components/organisms/navbar/Navbar';
import { NavbarForDesktop } from '@/src/components/organisms/navbar/NavbarForDesktop';
import { Settings } from '@/src/components/organisms/settings/Settings';

import styles from './Header.module.scss';

export const Header = () => {
  const { isMobile } = useIsMobile();
  const { sessionUser, isLoading } = useAuth();
  const { closeModal, isModalOpen, openModal } = useModal();

  if (isLoading) {
    return null;
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.anchor}>
        <h1 className={styles.heading}>PhotoApp</h1>
      </Link>
      <NavbarForDesktop />
      <Navbar />
      {!isMobile && sessionUser?.id && (
        <div className={styles.options}>
          <button type="button" className={styles.button} onClick={isModalOpen ? closeModal : openModal}>
            <Avatar userId={sessionUser.id} size="small" />
            <span className={styles.userInfo}>
              <span className={styles.name}>{sessionUser.name}</span>
              <span className={styles.username}>@{sessionUser.username}</span>
            </span>

            <span className={styles.icon}>
              <IconDotsVertical />
            </span>
          </button>
          <Settings isVisible={isModalOpen} closeModal={closeModal} />
        </div>
      )}
    </header>
  );
};
