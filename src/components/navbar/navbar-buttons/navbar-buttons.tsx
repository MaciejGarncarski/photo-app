import { IconSettings } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/src/hooks/use-auth';
import { useModal } from '@/src/hooks/use-modal';

import { SignInButton } from '@/src/components/buttons/sign-in-button/sign-in-button';
import { getNavListData } from '@/src/components/navbar/navbar-buttons/use-nav-buttons';
import { Settings } from '@/src/components/settings/settings';

import styles from './navbar-buttons.module.scss';

export const NavButtons = () => {
  const { sessionUser, isLoading, isSignedIn } = useAuth();
  const router = useRouter();
  const { openModal, closeModal, isModalOpen } = useModal();
  const { navButtonsList } = getNavListData(sessionUser?.username);

  return (
    <>
      <ul className={styles.list}>
        {navButtonsList.map(
          ({ icon: Icon, href, title, shouldShowWhileGuest }) => {
            if (!shouldShowWhileGuest && !isSignedIn) {
              return null;
            }

            return (
              <li key={title} className={styles.listItem}>
                <Link
                  href={href}
                  className={clsx(
                    router.asPath === href && styles.active,
                    styles.listItemContent,
                  )}
                >
                  <span>
                    <Icon />
                  </span>
                  <span className={styles.title}>{title}</span>
                </Link>
              </li>
            );
          },
        )}
        <li className={styles.listItem}>
          <button
            data-cy="settings button"
            type="button"
            className={styles.listItemContent}
            onClick={openModal}
          >
            <span>
              <IconSettings />
            </span>
            <span className={styles.title}>settings</span>
          </button>
        </li>
      </ul>
      {(!isSignedIn || isLoading) && <SignInButton />}
      <Settings isVisible={isModalOpen} closeModal={closeModal} />
    </>
  );
};
