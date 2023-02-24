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
      <div className={styles.leftCol}>
        <Avatar className={styles.avatar} userId={id} />
        {!isOwner && session && <FollowButton className={styles.button} userId={id ?? ''} />}
        {isOwner && (
          <Button type="button" onClick={open} className={styles.button}>
            <IconSettingsWrapper size="sm" />
            <span className={styles.menuButtonText}>settings</span>
            <VisuallyHiddenText text={modalOpen ? 'Close menu' : 'Open menu'} />
          </Button>
        )}
      </div>
      <div className={styles.rightCol}>
        <motion.h2 className={styles.username}>{username}</motion.h2>
        <AccountStats userId={id} />
        <p className={styles.name}>{name}</p>
        <p className={styles.bio}>{bio || 'No bio yet.'}</p>
      </div>
    </main>
  );
};
