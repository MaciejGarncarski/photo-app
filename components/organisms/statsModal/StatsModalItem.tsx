import { User } from '@prisma/client';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/buttons/followButton/FollowButton';

import styles from './statsModal.module.scss';

export const StatsModalItem = ({ user }: { user: User }) => {
  const { session } = useAuth();
  const { id, username } = user;

  return (
    <li key={id} className={styles.listItem}>
      <Link href={`/${username}`} className={styles.itemLink} onClick={close}>
        <Avatar userId={id} />
        <span className={styles.username}>@{username}</span>
      </Link>

      {user.id !== session?.user?.id && <FollowButton userId={id} />}
    </li>
  );
};
