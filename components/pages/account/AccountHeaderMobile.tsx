import { motion } from 'framer-motion';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useUser } from '@/hooks/useUser';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Button } from '@/components/atoms/buttons/button/Button';
import { FollowButton } from '@/components/atoms/buttons/followButton/FollowButton';
import { IconSettingsWrapper } from '@/components/atoms/icons/IconSettingsWrapper';
import { VisuallyHidden } from '@/components/atoms/visuallyHiddenText/VisuallyHidden';
import { AccountStats } from '@/components/molecules/accountStats/AccountStats';
import { containerVariants } from '@/components/molecules/imagesPreview/ImagesPreview';

import styles from './account.module.scss';

type PropsTypes = {
  username: string;
  isOwner: boolean;
  modalOpen: boolean;
  open: () => void;
};

export const AccountHeaderMobile = ({ username, isOwner, modalOpen, open }: PropsTypes) => {
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
      <Avatar userId={id} />
      <AccountStats userId={id} />
      {!isOwner && session && <FollowButton userId={id ?? ''} />}
      {isOwner && (
        <Button type="button" variant="primary" onClick={open}>
          <IconSettingsWrapper size="sm" />
          <VisuallyHidden>{modalOpen ? 'Close menu' : 'Open menu'}</VisuallyHidden>
          <span className={styles.menuButtonText}>settings</span>
        </Button>
      )}
      <p className={styles.name}>{name}</p>
      <p className={styles.bio}>{bio || 'No bio yet.'}</p>
    </motion.main>
  );
};
