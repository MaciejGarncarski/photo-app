import { IconLogout, IconUser } from '@tabler/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { tooltipVariant } from '@/components/atoms/tooltip/Tooltip';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { useScreenWidth } from '@/components/organisms/header/useScreenWidth';
import { useScrollPosition } from '@/components/organisms/header/useScrollPosition';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

import styles from './navAccountButton.module.scss';
import commonStyles from '@/components/molecules/navButtons/navButtons.module.scss';

type NavAccountIconProps = {
  userId: string;
};

export const NavAccountButton = ({ userId }: NavAccountIconProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLLIElement>(null);

  const { close, modalOpen, open } = useModal();

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
      onMouseEnter={isMobile ? undefined : handleOpen}
      onFocus={isMobile ? undefined : handleOpen}
      onMouseLeave={handleClose}
      onBlur={handleClose}
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
            key="tooltip options"
          >
            <p className={styles.welcome}>Hi, {account?.username}</p>
            <Link href={accountHref} className={styles.link} onClick={() => setIsOptionsOpen(false)}>
              <IconUser /> your account
            </Link>
            <button type="button" className={styles.signOut} onClick={open}>
              <IconLogout />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <ModalContainer>
        {modalOpen && <ConfirmationAlert headingText="Log out?" close={close} onConfirm={() => signOut()} />}
      </ModalContainer>
    </li>
  );
};
