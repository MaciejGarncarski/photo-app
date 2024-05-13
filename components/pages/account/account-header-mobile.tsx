import { GearSix } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

import { useAuth } from '@/hooks/use-auth';
import { useUser } from '@/hooks/use-user';

import { AccountStats } from '@/components/account-stats-bar/account-stats-bar';
import { Avatar } from '@/components/avatar/avatar';
import { Button } from '@/components/buttons/button/button';
import { ButtonLink } from '@/components/buttons/button-link/button-link';
import { FollowButton } from '@/components/buttons/follow-button/follow-button';

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
  const { data, isPending } = useUser({ userId });

  if (isPending || !data) {
    return null;
  }

  const { bio, name, username } = data;

  return (
    <motion.main className={styles.accountMobile}>
      <div className={styles.avatarName}>
        <Avatar userId={userId} size="big" />
        <motion.h2 className={styles.username}>{username}</motion.h2>
      </div>
      {!isOwner && isSignedIn && (
        <div className={styles.accountButtons}>
          <FollowButton userId={userId} />
          <ButtonLink href={`/chat/${userId}`}>Send message</ButtonLink>
        </div>
      )}
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
