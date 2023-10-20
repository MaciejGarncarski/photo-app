import Link from 'next/link';

import { useAuth } from '@/src/hooks/use-auth';
import { useIsMobile } from '@/src/hooks/use-is-mobile';

import { Avatar } from '@/src/components/avatar/avatar';
import { Navbar } from '@/src/components/navbar/navbar';
import { Settings } from '@/src/components/settings/settings';
import { useSettingsAtom } from '@/src/components/settings/use-settings-atom';

import styles from './header.module.scss';

export const Header = () => {
  const { isMobile } = useIsMobile();
  const { sessionUser, isPending } = useAuth();

  const { isSettingsOpen, setSettingsOpen } = useSettingsAtom();

  const showUserOptions = !isMobile && sessionUser?.id && !isPending;

  if (isMobile === 'loading') {
    return null;
  }

  if (isMobile) {
    return (
      <>
        <Navbar />
        <Settings
          isVisible={isSettingsOpen}
          closeSettingsModal={() => setSettingsOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.anchor}>
          <h1 className={styles.heading}>Photo App</h1>
        </Link>
        <Navbar />
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
      </header>
      <Settings
        isVisible={isSettingsOpen}
        closeSettingsModal={() => setSettingsOpen(false)}
      />
    </>
  );
};
