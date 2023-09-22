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

export const AccountHeaderMobile = ({
  userId,
  isOwner,
  isModalOpen,
  openModal,
}: Props) => {
  const { isSignedIn } = useAuth();
  const { data, isLoading } = useUser({ userId });

  if (isLoading || !data) {
    return null;
  }

  const { bio, name, username } = data;

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={styles.accountMobile}
    >
      <div className={styles.avatarName}>
        <Avatar userId={userId} size="big" />
        <motion.h2 className={styles.username}>{username}</motion.h2>
      </div>
      {!isOwner && isSignedIn && <FollowButton userId={userId} />}
      {isOwner && (
        <Button type="button" variant="primary" onClick={openModal}>
          <GearSix />
          <span className="visually-hidden">
            {isModalOpen ? 'Close menu' : 'Open menu'}
          </span>
          <span className={styles.menuButtonText}>Account settings</span>
        </Button>
      )}
      <AccountStats userId={userId} />
      {name && <p className={styles.name}>{name}</p>}
      <p className={styles.bio}>{bio || 'No bio yet.'}</p>
    </motion.main>
  );
};
