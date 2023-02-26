import { IconSend } from '@tabler/icons';
import clsx from 'clsx';

import { useAuth } from '@/hooks/useAuth';
import { useFollowers } from '@/hooks/useFollowers';
import { useUser } from '@/hooks/useUser';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Heading } from '@/components/atoms/heading/Heading';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';

import styles from './chat.module.scss';

type PropsTypes = {
  friendId: string;
};

export const Chat = ({ friendId }: PropsTypes) => {
  const { username, name } = useUser({ userId: friendId });
  const { session } = useAuth();

  const { data } = useFollowers({
    userId: session?.user?.id ?? '',
    type: 'followers',
  });

  return (
    <section className={styles.chat}>
      <nav>
        <ul className={styles.users}>
          {data?.pages.map((page) => {
            return page.users.map(({ id }) => {
              return (
                <li className={styles.user} key={id}>
                  <Avatar userId={id} />
                </li>
              );
            });
          })}
        </ul>
      </nav>
      <div className={styles.middle}>
        <header className={styles.header}>
          <Avatar userId={friendId} />
          <Heading tag="h2">
            {name}, @{username}
          </Heading>
        </header>

        <ul className={styles.messages}>
          {Array.from({ length: 10 }, (i, v) => v).map((el) => {
            return (
              <li className={clsx(el % 2 === 0 && styles.messageFriend, styles.message)} key={el}>
                <Avatar />
                dupaa
              </li>
            );
          })}
        </ul>
      </div>

      <form className={styles.form}>
        <input type="text" placeholder="Write something.." className={styles.input} />
        <button type="submit" className={styles.button}>
          <IconSend />
          <VisuallyHiddenText text="send" />
        </button>
      </form>
    </section>
  );
};
