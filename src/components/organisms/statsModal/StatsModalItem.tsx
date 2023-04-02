import Link from 'next/link';

import { useAuth } from '@/src/hooks/useAuth';
import { unlock } from '@/src/utils/bodyLock';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { FollowButton } from '@/src/components/molecules/followButton/FollowButton';

import { UserApiResponse } from '@/src/pages/api/account/[user]';

import styles from './statsModal.module.scss';

type Props = {
  user: UserApiResponse;
};

export const StatsModalItem = ({ user }: Props) => {
  const { session } = useAuth();
  const { id, username } = user;

  return (
    <li key={id} className={styles.listItem}>
      <Link href={`/${username}`} className={styles.itemLink} onClick={unlock}>
        <Avatar userId={id} size="small" />
        <span className={styles.username}>@{username}</span>
      </Link>
      {user.id !== session?.user?.id && <FollowButton userId={id} />}
    </li>
  );
};
