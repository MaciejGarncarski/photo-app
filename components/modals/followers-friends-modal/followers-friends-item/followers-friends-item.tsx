import Link from 'next/link';

import { useAuth } from '@/hooks/use-auth';
import { useUser } from '@/hooks/use-user';

import { Avatar } from '@/components/avatar/avatar';
import { FollowButton } from '@/components/buttons/follow-button/follow-button';
import { Loader } from '@/components/loader/loader';

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
        <Avatar userId={user.userId} size="small" />
        <span className={styles.username}>@{user.username}</span>
      </Link>
      {user.userId !== sessionUser?.id && <FollowButton userId={user.userId} />}
    </li>
  );
};
