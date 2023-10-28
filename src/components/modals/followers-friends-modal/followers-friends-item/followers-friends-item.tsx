import Link from 'next/link';

import { useAuth } from '@/src/hooks/use-auth';
import { useUser } from '@/src/hooks/use-user';

import { Avatar } from '@/src/components/avatar/avatar';
import { FollowButton } from '@/src/components/buttons/follow-button/follow-button';
import { Loader } from '@/src/components/loader/loader';

import styles from './followers-friends-item.module.scss';

type Props = {
  userId: string;
};

export const FollowersFriendsItem = ({ userId }: Props) => {
  const { sessionUser } = useAuth();
  const { data: user } = useUser({ userId });

  if (!user) {
    return <Loader size="small" color="primary" />;
  }

  return (
    <li className={styles.listItem}>
      <Link href={`/${user.username}`} className={styles.itemLink}>
        <Avatar userId={user.id} size="xs" />
        <span className={styles.username}>@{user.username}</span>
      </Link>
      {user.id !== sessionUser?.id && <FollowButton userId={user.id} />}
    </li>
  );
};
