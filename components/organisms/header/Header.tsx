import { IconDots } from '@tabler/icons-react';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { Navbar } from '@/components/molecules/navbar/Navbar';
import { NavbarForDesktop } from '@/components/molecules/navbar/NavbarForDesktop';
import { Settings } from '@/components/organisms/settings/Settings';

import styles from './header.module.scss';

export const Header = () => {
  const { isMobile } = useScreenWidth();
  const { sessionUserData, isSignedIn } = useAuth();
  const { close, modalOpen, open } = useModal();

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
              <button type="button" className={styles.button} onClick={modalOpen ? close : open}>
                <Avatar userId={sessionUserData.id} className={styles.avatar} />
                <span className={styles.userInfo}>
                  <span className={styles.name}>{sessionUserData.name}</span>
                  <span className={styles.username}>@{sessionUserData.username}</span>
                </span>

                <span className={styles.icon}>
                  <IconDots />
                </span>
              </button>
              <ModalContainer>{modalOpen && <Settings close={close} />}</ModalContainer>
            </>
          )}
        </div>
      )}
    </header>
  );
};
