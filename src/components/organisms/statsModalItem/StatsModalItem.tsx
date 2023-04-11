import Link from 'next/link';

import { useAuth } from '@/src/hooks/useAuth';
import { unlock } from '@/src/utils/bodyLock';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { FollowButton } from '@/src/components/molecules/followButton/FollowButton';

import { UserApiResponse } from '@/src/consts/schemas';

import styles from './StatsModalItem.module.scss';

type Props = {
  user: UserApiResponse;
};

export const StatsModalItem = ({ user: { id, username } }: Props) => {
  const { session } = useAuth();

  return (
    <li key={id} className={styles.listItem}>
      <Link href={`/${username}`} className={styles.itemLink} onClick={unlock}>
        <Avatar userId={id} size="small" />
        <span className={styles.username}>@{username}</span>
      </Link>
      {id !== session?.user?.id && <FollowButton userId={id} />}
    </li>
  );
};
