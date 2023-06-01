import { IconSettings } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';

import { SignInButton } from '@/src/components/atoms/buttons/signInButton/SignInButton';

import { getNavListData } from '@/src/components/organisms/navButtons/useNavButtonsList';
import { Settings } from '@/src/components/organisms/settings/Settings';

import styles from './NavButtons.module.scss';

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
