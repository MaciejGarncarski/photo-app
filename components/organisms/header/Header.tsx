import { IconDots } from '@tabler/icons';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { useModal } from '@/components/atoms/modal/useModal';
import { NavAccountMenu } from '@/components/atoms/navAccountMenu/NavAccountMenu';
import { SignInButton } from '@/components/atoms/signInButton/SignInButton';
import { Navbar } from '@/components/molecules/navbar/Navbar';
import { NavbarForDesktop } from '@/components/molecules/navbar/NavbarForDesktop';

import styles from './header.module.scss';

export const Header = () => {
  const { isMobile } = useScreenWidth();
  const { sessionUserData, isSignedIn, status } = useAuth();
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
          {!isSignedIn && !isMobile && <SignInButton />}

          {isSignedIn && (
            <>
              <button type="button" className={styles.button} onClick={modalOpen ? close : open}>
                <Avatar userId={sessionUserData.id} className={styles.avatar} />
                <span className={styles.userInfo}>
                  <span className={styles.name}>{sessionUserData.name}</span>
                  <span>@{sessionUserData.username}</span>
                </span>

                <span className={styles.icon}>
                  <IconDots />
                </span>
              </button>
              <AnimatePresence>{modalOpen && <NavAccountMenu onClick={close} />}</AnimatePresence>
            </>
          )}
        </div>
      )}
    </header>
  );
};
