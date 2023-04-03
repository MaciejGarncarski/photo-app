import { IconSettings } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';

import { SignInButton } from '@/src/components/atoms/buttons/signInButton/SignInButton';

const Settings = dynamic(() => import('@/src/components/organisms/settings/Settings').then((mod) => mod.Settings), {
  ssr: false,
  loading: () => <Loader color="blue" size="normal" />,
});

import dynamic from 'next/dynamic';

import { Loader } from '@/src/components/molecules/loader/Loader';

import { getNavListData } from '@/src/components/organisms/navButtons/useNavButtonsList';

import styles from './navButtons.module.scss';

export const NavButtons = () => {
  const { sessionUserData, status, isSignedIn } = useAuth();
  const router = useRouter();
  const { openModal, closeModal, isModalOpen } = useModal();
  const { navButtonsList } = getNavListData(sessionUserData.username);

  if (status === 'loading') {
    return null;
  }

  return (
    <>
      <ul className={styles.list}>
        {navButtonsList.map(({ icon: Icon, href, title, shouldShowWhileGuest }) => {
          if (!shouldShowWhileGuest && status === 'unauthenticated') {
            return null;
          }

          return (
            <li key={title} className={styles.listItem}>
              <Link href={href} className={clsx(router.asPath === href && styles.active, styles.listItemContent)}>
                <span>
                  <Icon />
                </span>
                <span className={styles.title}>{title}</span>
              </Link>
            </li>
          );
        })}
        <li className={styles.listItem}>
          <button type="button" className={styles.listItemContent} onClick={openModal}>
            <span>
              <IconSettings />
            </span>
            <span className={styles.title}>settings</span>
          </button>
        </li>
      </ul>
      {!isSignedIn && <SignInButton />}
      <Settings isVisible={isModalOpen} closeModal={closeModal} />
    </>
  );
};
