import Link from 'next/link';

import { useAuth } from '@/src/hooks/use-auth';

import { Avatar } from '@/src/components/avatar/avatar';
import { FollowButton } from '@/src/components/buttons/follow-button/follow-button';
import { User } from '@/src/schemas/user.schema';

import styles from './stats-modal-item.module.scss';

type Props = {
  user: User;
};

export const StatsModalItem = ({ user: { id, username } }: Props) => {
  const { sessionUser } = useAuth();

  return (
    <li key={id} className={styles.listItem}>
      <Link href={`/${username}`} className={styles.itemLink}>
        <Avatar userId={id} size="xs" />
        <span className={styles.username}>@{username}</span>
      </Link>
      {id !== sessionUser?.id && <FollowButton userId={id} />}
    </li>
  );
};
