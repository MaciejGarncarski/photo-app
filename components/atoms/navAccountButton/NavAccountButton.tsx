import { IconUser } from '@tabler/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import styles from './navAccountButton.module.scss';
import commonStyles from '@/components/molecules/navButtons/navButtons.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';
import { tooltipVariant } from '@/components/atoms/tooltip/Tooltip';
import { ConfirmationModal } from '@/components/molecules/confirmationModal/ConfirmationModal';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';
import { useScrollPosition } from '@/components/organisms/header/useScrollPosition';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

type NavAccountIconProps = {
  userId: string;
};

export const NavAccountButton = ({ userId }: NavAccountIconProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLLIElement>(null);

  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const { signOut } = useAuth();
  const { account } = useAccount({ userId });
  const { isGoingUp } = useScrollPosition();
  const { isMobile } = useScreenWidth();

  useEffect(() => {
    const handleTooltipClose = (mouseEv: MouseEvent) => {
      const target = mouseEv.target as HTMLElement;
      if (!containerRef.current?.contains(target)) {
        setIsOptionsOpen(false);
      }
    };

    const handleEscKey = (keyboardEv: KeyboardEvent) => {
      if (keyboardEv.key === 'Escape') {
        setIsOptionsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('click', handleTooltipClose);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('click', handleTooltipClose);
    };
  }, []);

  const handleOpen = () => setIsOptionsOpen(true);
  const handleClose = () => setIsOptionsOpen(false);

  if (!account) {
    return null;
  }

  const canShowOnScroll = (isMobile && isGoingUp) || !isMobile;

  const accountHref = `/${account.username}`;
  return (
    <li
      ref={containerRef}
      onMouseEnter={!isMobile ? handleOpen : undefined}
      onMouseLeave={handleClose}
      className={commonStyles.accountIconContainer}
    >
      <button
        type="button"
        onClick={() => setIsOptionsOpen((prev) => !prev)}
        className={clsx(commonStyles.listItemChild, styles.button)}
      >
        <span className="visually-hidden">
          @{account?.username} {account?.name}
        </span>
        <Avatar className={styles.avatar} userId={account.id} />
      </button>
      <AnimatePresence>
        {isOptionsOpen && canShowOnScroll && (
          <motion.div
            className={styles.options}
            variants={tooltipVariant}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <p className={styles.welcome}>Hi, {account?.username}</p>
            <Link href={accountHref} className={styles.link} onClick={() => setIsOptionsOpen(false)}>
              <IconUser /> your account
            </Link>
            <button type="button" className={styles.signOut} onClick={() => setIsSigningOut(true)}>
              <IconXWrapper />
              Sign out
            </button>
          </motion.div>
        )}

        {isSigningOut && (
          <ConfirmationModal
            key="sign out modal"
            confirmText="Sign out"
            onCancel={() => setIsSigningOut(false)}
            onConfirm={() => signOut()}
            setIsOpen={setIsSigningOut}
          />
        )}
      </AnimatePresence>
    </li>
  );
};
