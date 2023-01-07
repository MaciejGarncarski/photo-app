import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import styles from './navAccountIcon.module.scss';
import commonStyles from '@/components/molecules/navButtons/navButtons.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { tooltipVariant } from '@/components/atoms/tooltip/Tooltip';
import { useScrollPosition } from '@/components/organisms/header/useScrollPosition';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

type NavAccountIconProps = {
  userId: string;
};

export const NavAccountIcon = ({ userId }: NavAccountIconProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const { signOut } = useAuth();
  const { account } = useAccount({ userId });
  const { isGoingUp } = useScrollPosition();

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

  const accountHref = `/${account.username}`;
  return (
    <li
      ref={containerRef}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      className={commonStyles.accountIconContainer}
    >
      <Link href={accountHref} className={clsx(commonStyles.listItemChild, styles.button)}>
        <span className="visually-hidden">
          @{account?.username} {account?.name}
        </span>
        <Avatar userId={account.id} />
        <span className={commonStyles.listItemTitle}>Account</span>
      </Link>
      <AnimatePresence>
        {isOptionsOpen && isGoingUp && (
          <motion.div
            className={styles.options}
            variants={tooltipVariant}
            animate="animate"
            initial="initial"
            exit="exit"
          >
            <div className={styles.square}></div>
            <p className={styles.welcome}>Hi, {account?.username}</p>
            <Link href={accountHref} className={styles.link} onClick={() => setIsOptionsOpen(false)}>
              <AiOutlineUser /> your account
            </Link>
            <button type="button" className={styles.signOut} onClick={() => signOut()}>
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
