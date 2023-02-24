import { motion } from 'framer-motion';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useUser } from '@/hooks/useUser';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Button } from '@/components/atoms/button/Button';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { IconSettingsWrapper } from '@/components/atoms/icons/IconSettingsWrapper';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

import styles from './account.module.scss';

import { listData } from './Account';

type PropsTypes = {
  username: string;
  isOwner: boolean;
  modalOpen: boolean;
  open: () => void;
};

export const AccountHeaderMobile = ({ username, isOwner, modalOpen, open }: PropsTypes) => {
  const { session } = useAuth();
  const userData = useUser({ username });
  const { id, bio, name, count } = userData;
  const { isMobile } = useScreenWidth();

  if (!isMobile) {
    return null;
  }

  return (
    <main className={styles.account}>
      <motion.h2 className={styles.username}>{username}</motion.h2>
      <Avatar className={styles.avatar} userId={id} />
      {count && (
        <motion.ul className={styles.list}>
          {listData.map((item) => {
            return (
              <li className={styles.listItem} key={item}>
                <p className={styles.listItemNumber}>{count[item]}</p>
                <p className={styles.listItemText}>{item}</p>
              </li>
            );
          })}
        </motion.ul>
      )}
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
    </main>
  );
};
