import { UseInfiniteQueryResult } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { MotionLink } from '@/components/atoms/accountPost/AccountPost';
import { Avatar } from '@/components/atoms/avatar/Avatar';
import { containerVariants } from '@/components/molecules/imagesPreview/ImagesPreview';
import { Loader } from '@/components/molecules/loader/Loader';
import { ChatUsersResponse } from '@/components/pages/chat/useChatUsers';

import styles from './chatUsersList.module.scss';

const linkVariants: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
    scale: 0.8,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};

type PropsTypes = {
  chatUsers: UseInfiniteQueryResult<ChatUsersResponse, unknown>;
  isEnabled: boolean;
};

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
        <Loader />
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
                  <Avatar userId={user.id} />
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
            <Loader />
          </div>
        )}
      </motion.ul>
    </nav>
  );
};
