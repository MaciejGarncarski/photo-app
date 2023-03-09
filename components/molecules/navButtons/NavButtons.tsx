import { IconHome, IconMessage, IconSettings, IconSquareRoundedPlus, IconUser } from '@tabler/icons';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { SignInButton } from '@/components/atoms/buttons/signInButton/SignInButton';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { Settings } from '@/components/organisms/settings/Settings';

import styles from './navButtons.module.scss';

export type ListData = {
  icon: ReactNode;
  title: string;
  href: string;
  shouldShowWhileGuest: boolean;
};

export const NavButtons = () => {
  const { sessionUserData, status, isSignedIn } = useAuth();
  const router = useRouter();
  const { open, close, modalOpen } = useModal();

  if (status === 'loading') {
    return null;
  }

  const listData: Array<ListData> = [
    {
      icon: <IconHome />,
      title: 'Home',
      href: '/',
      shouldShowWhileGuest: true,
    },
    {
      icon: <IconMessage />,
      title: 'Chat',
      href: '/chat',
      shouldShowWhileGuest: false,
    },
    {
      icon: <IconSquareRoundedPlus />,
      title: 'Create post',
      href: '/create-post',
      shouldShowWhileGuest: false,
    },
    {
      icon: <IconUser />,
      title: 'Profile',
      href: `/${sessionUserData.username}`,
      shouldShowWhileGuest: false,
    },
  ];

  return (
    <>
      <ul className={styles.list}>
        {listData.map(({ icon, href, title, shouldShowWhileGuest }) => {
          if (!shouldShowWhileGuest && status === 'unauthenticated') {
            return null;
          }

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
      {!isSignedIn && <SignInButton />}
      <ModalContainer>{modalOpen && <Settings close={close} />}</ModalContainer>
    </>
  );
};
