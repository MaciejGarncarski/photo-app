import { User } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/hooks/useAuth';
import { string } from '@/utils/string';

import { MotionLink } from '@/components/atoms/accountPost/AccountPost';
import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Heading } from '@/components/atoms/heading/Heading';
import { containerVariants } from '@/components/molecules/imagesPreview/ImagesPreview';

import styles from './chatUsers.module.scss';

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

type Response = {
  users: Array<{
    user: User;
    chatRoomId: number;
  }>;
  usersCount: number;
  canLoadMore: boolean;
  nextCursor: number | null;
};

export const ChatUsers = () => {
  const { session } = useAuth();
  const router = useRouter();

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['chat users', session?.user?.id],
    async ({ pageParam = 0 }) => {
      const { data: responseData } = await axios.get<Response>(
        `/api/chat/getChatUsers?userId=${session?.user?.id}&currentPage=${pageParam}`,
      );

      return responseData;
    },
  );

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: !hasNextPage,
    rootMargin: '0px 0px 200px 0px',
  });

  if (!data || isLoading) {
    return null;
  }

  return (
    <motion.nav ref={rootRef} className={styles.nav} variants={containerVariants} initial="hidden" animate="show">
      <Heading tag="h2" className={styles.heading}>
        Select other user to chat :)
      </Heading>
      {data.pages.map((page) => {
        return page.users.map(({ user, chatRoomId }) => {
          const isActive = chatRoomId === Number(string(router.query.chatRoom));
          return (
            <MotionLink
              variants={linkVariants}
              key={user.id}
              href={`/chat/${chatRoomId}`}
              className={clsx(isActive && styles.linkActive, styles.link)}
            >
              <Avatar className={styles.avatar} userId={user.id} />
              <p className={styles.username}>@{user.username}</p>
            </MotionLink>
          );
        });
      })}
      {hasNextPage || (isLoading && <li ref={infiniteRef}>loading</li>)}
    </motion.nav>
  );
};
