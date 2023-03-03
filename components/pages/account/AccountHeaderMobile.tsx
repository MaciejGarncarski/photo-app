import { motion } from 'framer-motion';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useUser } from '@/hooks/useUser';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Button } from '@/components/atoms/button/Button';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { IconSettingsWrapper } from '@/components/atoms/icons/IconSettingsWrapper';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
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
    <motion.div variants={containerVariants} initial="hidden" animate="show" className={styles.accountMobile}>
      <motion.h2 className={styles.username}>{username}</motion.h2>
      <Avatar className={styles.avatar} userId={id} />
      <AccountStats userId={id} />
      {!isOwner && session && <FollowButton className={styles.button} userId={id ?? ''} />}
      {isOwner && (
        <Button type="button" onClick={open} className={styles.button}>
          <IconSettingsWrapper size="sm" />
          <VisuallyHiddenText text={modalOpen ? 'Close menu' : 'Open menu'} />
          <span className={styles.menuButtonText}>settings</span>
        </Button>
      )}
      <p className={styles.name}>{name}</p>
      <p className={styles.bio}>{bio || 'No bio yet.'}</p>
    </motion.div>
  );
};
