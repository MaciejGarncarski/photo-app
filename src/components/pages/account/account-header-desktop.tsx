import { GearSix } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

import { useAuth } from '@/src/hooks/use-auth';
import { useUser } from '@/src/hooks/use-user';

import { AccountStats } from '@/src/components/account-stats-bar/account-stats-bar';
import { Avatar } from '@/src/components/avatar/avatar';
import { Button } from '@/src/components/buttons/button/button';
import { FollowButton } from '@/src/components/buttons/follow-button/follow-button';
import { containerVariants } from '@/src/components/images-preview/images-preview.animation';

import styles from './account.module.scss';

type Props = {
  userId: string;
  isOwner: boolean;
  isModalOpen: boolean;
  openModal: () => void;
};

export const AccountHeaderDesktop = ({
  userId,
  isOwner,
  isModalOpen,
  openModal,
}: Props) => {
  const { isSignedIn } = useAuth();
  const { data, isPending } = useUser({ userId });

  if (isPending || !data) {
    return null;
  }

  const { bio, name, username } = data;

  return (
    <main className={styles.accountDesktop}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={styles.leftCol}
      >
        <Avatar userId={userId} size="big" />
        {!isOwner && isSignedIn && <FollowButton userId={userId} />}
        {isOwner && (
          <Button type="button" variant="primary" onClick={openModal}>
            <GearSix />
            <span className={styles.menuButtonText}>Settings</span>
            <span className="visually-hidden">
              {isModalOpen ? 'Close menu' : 'Open menu'}
            </span>
          </Button>
        )}
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className={styles.rightCol}
      >
        <motion.h2 className={styles.username}>{username}</motion.h2>
        <AccountStats userId={userId} />
        {name && <motion.p className={styles.name}>{name}</motion.p>}
        <motion.p className={styles.bio}>{bio || 'No bio yet.'}</motion.p>
      </motion.div>
    </main>
  );
};
