import Link from 'next/link';

import { useAuth } from '@/src/hooks/use-auth';
import { useIsMobile } from '@/src/hooks/use-is-mobile';

import { Avatar } from '@/src/components/avatar/avatar';
import { Navbar } from '@/src/components/navbar/navbar';

import styles from './header.module.scss';

export const Header = () => {
  const { isMobile } = useIsMobile();
  const { sessionUser, isLoading } = useAuth();

  const showUserOptions = !isMobile && sessionUser?.id && !isLoading;

  if (isMobile === 'loading') {
    return null;
  }

  if (isMobile) {
    return <Navbar />;
  }

  return (
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
  );
};
