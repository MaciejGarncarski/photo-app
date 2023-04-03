import { motion } from 'framer-motion';

import { useAuth } from '@/src/hooks/useAuth';
import { useScreenWidth } from '@/src/hooks/useScreenWidth';
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
  username: string;
  isOwner: boolean;
  isModalOpen: boolean;
  openModal: () => void;
};

export const AccountHeaderMobile = ({ username, isOwner, isModalOpen, openModal }: PropsTypes) => {
  const { session } = useAuth();
  const userData = useUser({ username });
  const { id, bio, name } = userData;
  const { isMobile } = useScreenWidth();

  if (!isMobile || !id) {
    return null;
  }

  return (
    <motion.main variants={containerVariants} initial="hidden" animate="show" className={styles.accountMobile}>
      <motion.h2 className={styles.username}>{username}</motion.h2>
      <Avatar userId={id} size="big" />
      <AccountStats userId={id} />
      {!isOwner && session && <FollowButton userId={id ?? ''} />}
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
