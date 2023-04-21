import Link from 'next/link';

import { useAuth } from '@/src/hooks/useAuth';
import { unlock } from '@/src/utils/bodyLock';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { FollowButton } from '@/src/components/molecules/followButton/FollowButton';

import { User } from '@/src/schemas/user.schema';

import styles from './StatsModalItem.module.scss';

type Props = {
  user: User;
};

export const StatsModalItem = ({ user: { id, username } }: Props) => {
  const { sessionUser } = useAuth();

  return (
    <li key={id} className={styles.listItem}>
      <Link href={`/${username}`} className={styles.itemLink} onClick={unlock}>
        <Avatar userId={id} size="small" />
        <span className={styles.username}>@{username}</span>
      </Link>
      {id !== sessionUser?.id && <FollowButton userId={id} />}
    </li>
  );
};
