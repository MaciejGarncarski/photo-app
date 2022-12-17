import clsx from 'clsx';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';

import styles from './accountIcon.module.scss';
import commonStyles from '@/components/molecules/headerButtons/headerButtons.module.scss';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';

type AccountIconProps = {
  id: string;
};

export const tooltipVariant: Variants = {
  initial: {
    opacity: 0.7,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    transition: {
      type: 'tween',
      duration: 0.25,
    },
    opacity: 0,
  },
};

export const AccountIcon = ({ id }: AccountIconProps) => {
  const { session, signOut } = useAuth();
  const { account } = useAccount({ id });

  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLLIElement>(null);

  const onBtnClick = () => setIsOptionsOpen((prev) => !prev);

  useEffect(() => {
    const handleClose = (mouseEv: MouseEvent) => {
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

    const timeout = setTimeout(() => {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('click', handleClose);
    }, 200);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', handleClose);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  if (!session) {
    return null;
  }

  return (
    <li
      className={commonStyles.accountIconContainer}
      ref={containerRef}
      onClick={onBtnClick}
      onMouseEnter={() => setIsOptionsOpen(true)}
      onMouseLeave={() => setIsOptionsOpen(false)}
    >
      <button className={clsx(commonStyles.listItemChild, styles.button)} onClick={onBtnClick}>
        <span className='visually-hidden'>{session.user?.name}</span>
        <Avatar userID={session.user?.id ?? ''} alt='' />
        <span className={commonStyles.listItemTitle}>Account</span>
      </button>
      <AnimatePresence>
        {isOptionsOpen && (
          <motion.div
            className={styles.options}
            variants={tooltipVariant}
            animate='animate'
            initial='initial'
            exit='exit'
          >
            <div className={styles.square}></div>
            <p className={styles.welcome}>Hi, {account?.username}</p>
            <Link
              href={`/${account?.username}`}
              className={styles.link}
              onClick={() => setIsOptionsOpen(false)}
            >
              <AiOutlineUser /> your account
            </Link>
            <button type='button' className={styles.signOut} onClick={() => signOut()}>
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};
