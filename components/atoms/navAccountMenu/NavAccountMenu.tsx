import { IconLogout, IconUser } from '@tabler/icons';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';

import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { tooltipVariant } from '@/components/atoms/tooltip/Tooltip';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';

import styles from './navAccountMenu.module.scss';

type PropsTypes = {
  onClick: () => void;
};

export const NavAccountMenu = ({ onClick }: PropsTypes) => {
  const {
    signOut,
    sessionUserData: { username },
  } = useAuth();
  const { close, modalOpen, open } = useModal();

  return (
    <>
      <motion.div
        className={styles.options}
        variants={tooltipVariant}
        animate="animate"
        initial="initial"
        exit="exit"
        data-testid="menu"
        key="tooltip options"
      >
        <p className={styles.welcome}>Hi, {username}</p>
        <Link href={`/${username}`} className={styles.link} onClick={onClick}>
          <IconUser /> your account
        </Link>
        <button type="button" className={styles.signOut} onClick={open}>
          <IconLogout />
          Log out
        </button>
      </motion.div>
      <ModalContainer>
        {modalOpen && <ConfirmationAlert headingText="Log out?" close={close} onConfirm={() => signOut()} />}
      </ModalContainer>
    </>
  );
};
