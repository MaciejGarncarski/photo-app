import { IconSettings } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { SignInButton } from '@/components/atoms/buttons/signInButton/SignInButton';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { useListData } from '@/components/molecules/navButtons/useListData';

const Settings = dynamic(() => import('@/components/organisms/settings/Settings').then((mod) => mod.Settings), {
  ssr: false,
  loading: () => <Loader variant="margin-top" />,
});

import dynamic from 'next/dynamic';

import { lock, unlock } from '@/utils/bodyLock';

import { Loader } from '@/components/atoms/loader/Loader';

import styles from './navButtons.module.scss';

export type ListData = {
  icon: ReactNode;
  title: string;
  href: string;
  shouldShowWhileGuest: boolean;
};

export const NavButtons = () => {
  const { status, isSignedIn } = useAuth();
  const router = useRouter();
  const { open, close, modalOpen } = useModal();
  const { listData } = useListData();

  const openSettings = () => {
    open();
    lock();
  };

  const closeSettings = () => {
    close();
    unlock();
  };

  if (status === 'loading') {
    return null;
  }

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
          <button type="button" className={styles.listItemContent} onClick={openSettings}>
            <span>
              <IconSettings />
            </span>
            <span className={styles.title}>settings</span>
          </button>
        </li>
      </ul>
      {!isSignedIn && <SignInButton />}
      <ModalContainer>{modalOpen && <Settings close={closeSettings} />}</ModalContainer>
    </>
  );
};
