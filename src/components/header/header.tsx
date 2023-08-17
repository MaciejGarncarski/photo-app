import { IconDotsVertical } from '@tabler/icons-react';
import Link from 'next/link';

import { useAuth } from '@/src/hooks/use-auth';
import { useIsMobile } from '@/src/hooks/use-is-mobile';
import { useModal } from '@/src/hooks/use-modal';

import { Avatar } from '@/src/components/avatar/avatar';
import { Navbar } from '@/src/components/navbar/navbar';
import { NavbarForDesktop } from '@/src/components/navbar/navbar-desktop';
import { Settings } from '@/src/components/settings/settings';

import styles from './header.module.scss';

export const Header = () => {
  const { isMobile } = useIsMobile();
  const { sessionUser, isLoading } = useAuth();
  const { closeModal, isModalOpen, openModal } = useModal();

  const showUserOptions = !isMobile && sessionUser?.id && !isLoading;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.anchor}>
        <h1 className={styles.heading}>PhotoApp</h1>
      </Link>
      {isMobile !== 'loading' && (
        <>{isMobile ? <Navbar /> : <NavbarForDesktop />}</>
      )}
      {showUserOptions && (
        <div className={styles.options}>
          <button
            type="button"
            className={styles.button}
            onClick={isModalOpen ? closeModal : openModal}
          >
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
