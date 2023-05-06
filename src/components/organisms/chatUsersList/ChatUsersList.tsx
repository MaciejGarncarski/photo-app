import { UseInfiniteQueryResult } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { FetchError } from '@/src/components/molecules/fetchError/FetchError';
import { containerVariants } from '@/src/components/molecules/imagesPreview/ImagesPreview.animation';
import { Loader } from '@/src/components/molecules/loader/Loader';

import { linkVariants } from '@/src/components/organisms/chatUsersList/ChatUsersList.animation';

import { ChatUsersResponse } from '@/src/schemas/chat';

import styles from './ChatUsersList.module.scss';

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

  if (isError) {
    return <FetchError message="Cannot fetch users." />;
  }

  if (data?.pages[0].usersCount === 0) {
    return <p>no users found</p>;
  }

  return (
    <nav className={styles.nav}>
      <motion.ul variants={containerVariants} initial="hidden" animate="show" className={styles.list}>
        {data?.pages &&
          data.pages.map((page) => {
            return page.users.map(({ id, name, username }) => {
              const isActive = id === (router.query.receiverId as string);
              return (
                <li key={id}>
                  <MotionLink
                    variants={linkVariants}
                    href={`/chat/${id}`}
                    className={clsx(isActive && styles.linkActive, styles.link)}
                  >
                    <Avatar userId={id} size="medium" />
                    <span className={styles.name}>
                      <span className={styles.fullName}>{name}</span>
                      <span className={styles.username}>@{username}</span>
                    </span>
                  </MotionLink>
                </li>
              );
            });
          })}
        {(hasNextPage || isLoading) && (
          <div ref={infiniteRef}>
            <Loader color="blue" size="normal" />
          </div>
        )}
      </motion.ul>
    </nav>
  );
};
