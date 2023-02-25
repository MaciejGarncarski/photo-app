import { IconHome, IconSettings, IconSquareRoundedPlus, IconUser } from '@tabler/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { SignInButton } from '@/components/atoms/signInButton/SignInButton';

import styles from './navButtons.module.scss';

import { Settings } from '../settings/Settings';

export type ListData = {
  icon: ReactNode;
  title: string;
  href: string;
};

export const NavButtons = () => {
  const { sessionUserData, session, status, isSignedIn } = useAuth();
  const router = useRouter();
  const { open, close, modalOpen } = useModal();

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
    },
    {
      icon: <IconSquareRoundedPlus />,
      title: 'Create post',
      href: '/create-post',
    },
    {
      icon: <IconUser />,
      title: 'Profile',
      href: `/${sessionUserData.username}`,
    },
  ];

  return (
    <>
      <ul className={styles.list}>
        {listData.map(({ icon, href, title }) => {
          return (
            <li key={title} className={styles.listItem}>
              <Link href={href} className={clsx(router.asPath === href && styles.active, styles.listItemContent)}>
                <span>{icon}</span>
                <span className={styles.title}>{title}</span>
              </Link>
            </li>
          );
        })}
        <li className={styles.listItem}>
          <button type="button" className={styles.listItemContent} onClick={open}>
            <span>
              <IconSettings />
            </span>
            <span className={styles.title}>settings</span>
          </button>
        </li>
      </ul>
      <ModalContainer>{modalOpen && <Settings close={close} />}</ModalContainer>
    </>
  );
};
