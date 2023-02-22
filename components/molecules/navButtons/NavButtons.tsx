import { IconHome, IconSquareRoundedPlus, IconUser } from '@tabler/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { SignInButton } from '@/components/atoms/signInButton/SignInButton';

import styles from './navButtons.module.scss';

export type ListData = {
  icon: ReactNode;
  title: string;
  pathname: string;
  href: string;
};

export const NavButtons = () => {
  const { sessionUserData, session, status, isSignedIn } = useAuth();
  const router = useRouter();

  if (status === 'loading') {
    return null;
  }

  if (!isSignedIn || !session?.user?.id) {
    return <SignInButton />;
  }

  const listData: Array<ListData> = [
    {
      icon: <IconHome />,
      title: 'Home',
      href: '/',
      pathname: '/',
    },
    {
      icon: <IconSquareRoundedPlus />,
      title: 'Create post',
      href: '/create-post',
      pathname: '/create-post',
    },
    {
      icon: <IconUser />,
      title: 'Profile',
      href: `/${sessionUserData.username}`,
      pathname: '/[username]',
    },
  ];

  return (
    <ul className={styles.list}>
      {listData.map(({ icon, href, title, pathname }) => {
        return (
          <li key={title} className={styles.listItem}>
            <Link href={href} className={clsx(router.pathname === pathname && styles.active, styles.listItemContent)}>
              <span>{icon}</span>
              <span className={styles.title}>{title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
