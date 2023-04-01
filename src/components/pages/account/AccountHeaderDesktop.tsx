import { motion } from 'framer-motion';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useUser } from '@/hooks/useUser';

import { Button } from '@/components/atoms/buttons/button/Button';
import { IconSettingsWrapper } from '@/components/atoms/icons/IconSettingsWrapper';
import { VisuallyHidden } from '@/components/atoms/visuallyHiddenText/VisuallyHidden';
import { AccountStats } from '@/components/molecules/accountStats/AccountStats';
import { Avatar } from '@/components/molecules/avatar/Avatar';
import { FollowButton } from '@/components/molecules/followButton/FollowButton';
import { containerVariants } from '@/components/molecules/imagesPreview/ImagesPreview';

import styles from './account.module.scss';

type PropsTypes = {
  username: string;
  isOwner: boolean;
  modalOpen: boolean;
  open: () => void;
};

export const AccountHeaderDesktop = ({ username, isOwner, modalOpen, open }: PropsTypes) => {
  const { isMobile } = useScreenWidth();
  const { session } = useAuth();
  const userData = useUser({ username });
  const { id, bio, name } = userData;

  if (isMobile || !id) {
    return null;
  }

  return (
    <main className={styles.accountDesktop}>
      <motion.div variants={containerVariants} initial="hidden" animate="show" className={styles.leftCol}>
        <Avatar userId={id} size="big" />
        {!isOwner && session && <FollowButton userId={id ?? ''} />}
        {isOwner && (
          <Button type="button" variant="primary" onClick={open}>
            <IconSettingsWrapper size="sm" />
            <span className={styles.menuButtonText}>settings</span>
            <VisuallyHidden>{modalOpen ? 'Close menu' : 'Open menu'}</VisuallyHidden>
          </Button>
        )}
      </motion.div>
      <motion.div variants={containerVariants} initial="hidden" animate="show" className={styles.rightCol}>
        <motion.h2 className={styles.username}>{username}</motion.h2>
        <AccountStats userId={id} />
        <motion.p className={styles.name}>{name}</motion.p>
        <motion.p className={styles.bio}>{bio || 'No bio yet.'}</motion.p>
      </motion.div>
    </main>
  );
};
