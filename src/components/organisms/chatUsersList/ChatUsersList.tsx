import { UseInfiniteQueryResult } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { containerVariants } from '@/src/components/molecules/imagesPreview/ImagesPreview.animation';
import { Loader } from '@/src/components/molecules/loader/Loader';

import { linkVariants } from '@/src/components/organisms/chatUsersList/ChatUsersList.animation';

import { ChatUsersResponse } from '@/src/components/pages/chat/useChatUsers';

import styles from './chatUsersList.module.scss';

type PropsTypes = {
  chatUsers: UseInfiniteQueryResult<ChatUsersResponse, unknown>;
  isEnabled: boolean;
};

const MotionLink = motion(Link);

export const ChatUsersList = ({ chatUsers, isEnabled }: PropsTypes) => {
  const router = useRouter();
  const { data, isLoading, fetchNextPage, hasNextPage, isError } = chatUsers;

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading && isEnabled,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError || !hasNextPage,
    rootMargin: '0px 0px 300px 0px',
  });

  if (!data) {
    return (
      <div className={styles.loader}>
        <Loader color="blue" size="normal" />
      </div>
    );
  }

  const { usersCount } = data.pages[0];

  if (usersCount === 0) {
    return <p>no users found</p>;
  }

  return (
    <nav className={styles.nav}>
      <motion.ul variants={containerVariants} initial="hidden" animate="show" className={styles.list}>
        {data.pages.map((page) => {
          return page.users.map(({ user, chatRoomId }) => {
            const isActive = chatRoomId === Number(router.query.chatRoom as string);
            return (
              <li key={user.id}>
                <MotionLink
                  variants={linkVariants}
                  href={`/chat/${chatRoomId}`}
                  className={clsx(isActive && styles.linkActive, styles.link)}
                >
                  <Avatar userId={user.id} size="medium" />
                  <span className={styles.name}>
                    <span className={styles.fullName}>{user.name}</span>
                    <span className={styles.username}>@{user.username}</span>
                  </span>
                </MotionLink>
              </li>
            );
          });
        })}
        {(hasNextPage || isLoading) && (
          <div ref={infiniteRef}>
            <Loader color="blue" size="normal" />;
          </div>
        )}
      </motion.ul>
    </nav>
  );
};
