import { motion } from 'framer-motion';
import { atom } from 'jotai';
import Link from 'next/link';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/hooks/useAuth';
import { useOtherUsers } from '@/hooks/useOtherUsers';

import { Heading } from '@/components/atoms/heading/Heading';
import { NewPostNotification } from '@/components/atoms/newPostNotification/NewPostNotification';
import { PostPlaceholder } from '@/components/atoms/postPlaceholder/PostPlaceholder';
import { Avatar } from '@/components/molecules/avatar/Avatar';
import { FollowButton } from '@/components/molecules/followButton/FollowButton';
import { containerVariants } from '@/components/molecules/imagesPreview/ImagesPreview.animation';
import { HomePost } from '@/components/organisms/homePost/HomePost';
import { useInfinitePosts } from '@/components/pages/home/useInfinitePosts';

import styles from './home.module.scss';

export const newPostsAtom = atom(false);
export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useInfinitePosts();
  const { isSignedIn } = useAuth();
  const otherUsers = useOtherUsers();

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 100px 0px',
  });

  return (
    <div className={styles.home}>
      <motion.ul className={styles.posts} variants={containerVariants} animate="show" initial="hidden">
        <NewPostNotification />
        {data?.pages.map((page) => {
          return page?.posts.map((post, idx) => {
            return <HomePost priority={idx < 4} key={post.postId} post={post} />;
          });
        })}
        {(isLoading || hasNextPage) && (
          <li ref={sentryRef}>
            <PostPlaceholder />
            <PostPlaceholder />
          </li>
        )}
      </motion.ul>

      <aside className={styles.aside}>
        <section className={styles.asideItem}>
          <Heading tag="h2" size="medium">
            New users
          </Heading>
          {otherUsers.data && (
            <ul className={styles.asideList}>
              {otherUsers?.data &&
                otherUsers.data.map(({ id, username, name }) => {
                  return (
                    <li key={id} className={styles.asideListItem}>
                      <Link href={`/${username}`} className={styles.link}>
                        <Avatar userId={id} size="small" />
                        <div className={styles.names}>
                          <p className={styles.fullName}>{name}</p>
                          <p className={styles.username}>@{username}</p>
                        </div>
                      </Link>
                      {isSignedIn && (
                        <div className={styles.asideFollowButton}>
                          <FollowButton userId={id} />
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          )}
        </section>
      </aside>
    </div>
  );
};
