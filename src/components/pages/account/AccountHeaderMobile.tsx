import { motion } from 'framer-motion';

import { useAuth } from '@/src/hooks/useAuth';
import { useUser } from '@/src/hooks/useUser';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { IconSettingsWrapper } from '@/src/components/atoms/icons/IconSettingsWrapper';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { FollowButton } from '@/src/components/molecules/followButton/FollowButton';
import { containerVariants } from '@/src/components/molecules/imagesPreview/ImagesPreview.animation';

import { AccountStats } from '@/src/components/organisms/accountStats/AccountStats';

import styles from './account.module.scss';

type PropsTypes = {
  userId: string;
  isOwner: boolean;
  isModalOpen: boolean;
  openModal: () => void;
};

export const AccountHeaderMobile = ({ userId, isOwner, isModalOpen, openModal }: PropsTypes) => {
  const { session } = useAuth();
  const { data, isLoading } = useUser({ userId });

  if (isLoading || !data) {
    return null;
  }

  const { bio, name, username } = data;

  return (
    <motion.main variants={containerVariants} initial="hidden" animate="show" className={styles.accountMobile}>
      <motion.h2 className={styles.username}>{username}</motion.h2>
      <Avatar userId={userId} size="big" />
      <AccountStats userId={userId} />
      {!isOwner && session && <FollowButton userId={userId} />}
      {isOwner && (
        <Button type="button" variant="primary" onClick={openModal}>
          <IconSettingsWrapper size="sm" />
          <VisuallyHidden>{isModalOpen ? 'Close menu' : 'Open menu'}</VisuallyHidden>
          <span className={styles.menuButtonText}>settings</span>
        </Button>
      )}
      {name && <p className={styles.name}>{name}</p>}
      <p className={styles.bio}>{bio || 'No bio yet.'}</p>
    </motion.main>
  );
};
