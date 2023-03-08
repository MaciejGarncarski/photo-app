import { User } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/hooks/useAuth';
import { string } from '@/utils/string';

import { MotionLink } from '@/components/atoms/accountPost/AccountPost';
import { Avatar } from '@/components/atoms/avatar/Avatar';
import { Heading } from '@/components/atoms/heading/Heading';
import { Loader } from '@/components/atoms/loader/Loader';
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
  totalPages: number;
  currentPage: number;
};

export const ChatUsers = () => {
  const [inputVal, setInputVal] = useState<string>('');
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
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (prevMessages) => {
        return prevMessages?.currentPage === prevMessages.totalPages ? undefined : prevMessages.currentPage + 1;
      },
    },
  );

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: !hasNextPage,
    rootMargin: '0px 0px 500px 0px',
  });

  if (!data || isLoading) {
    return null;
  }

  return (
    <motion.section className={styles.container} variants={containerVariants} initial="hidden" animate="show">
      <Heading tag="h2" className={styles.heading}>
        Select other user.
      </Heading>
      {/* 
      <form>
        <Input type="text" labelText="Search user" onChange={(e) => setInputVal(e.target.value)} />
        <Button type="reset">Reset</Button>
      </form> */}

      <nav>
        <ul className={styles.list}>
          {inputVal === '' && (
            <>
              {data.pages.map((page) => {
                return page.users.map(({ user, chatRoomId }) => {
                  const isActive = chatRoomId === Number(string(router.query.chatRoom));
                  return (
                    <li key={user.id}>
                      <MotionLink
                        variants={linkVariants}
                        href={`/chat/${chatRoomId}`}
                        className={clsx(isActive && styles.linkActive, styles.link)}
                      >
                        <Avatar className={styles.avatar} userId={user.id} />
                        <span className={styles.name}>
                          <span className={styles.fullName}>{user.name}</span>
                          <span className={styles.username}>@{user.username}</span>
                        </span>
                      </MotionLink>
                    </li>
                  );
                });
              })}
            </>
          )}
          {hasNextPage && (
            <li ref={infiniteRef}>
              <Loader />
            </li>
          )}
        </ul>
      </nav>
    </motion.section>
  );
};
