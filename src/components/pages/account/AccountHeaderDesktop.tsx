import { motion } from 'framer-motion';

import { useAuth } from '@/src/hooks/useAuth';
import { useScreenWidth } from '@/src/hooks/useScreenWidth';
import { useUser } from '@/src/hooks/useUser';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { IconSettingsWrapper } from '@/src/components/atoms/icons/IconSettingsWrapper';
import { VisuallyHidden } from '@/src/components/atoms/visuallyHiddenText/VisuallyHidden';
import { AccountStats } from '@/src/components/molecules/accountStats/AccountStats';
import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { FollowButton } from '@/src/components/molecules/followButton/FollowButton';
import { containerVariants } from '@/src/components/molecules/imagesPreview/ImagesPreview.animation';

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
        {name && <motion.p className={styles.name}>{name}</motion.p>}
        <motion.p className={styles.bio}>{bio || 'No bio yet.'}</motion.p>
      </motion.div>
    </main>
  );
};
