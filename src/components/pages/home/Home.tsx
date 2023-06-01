import { motion } from 'framer-motion';
import { atom } from 'jotai';
import Link from 'next/link';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/src/hooks/useAuth';

import { Heading } from '@/src/components/atoms/heading/Heading';
import { NewPostNotification } from '@/src/components/atoms/newPostNotification/NewPostNotification';
import { PostPlaceholder } from '@/src/components/atoms/postPlaceholder/PostPlaceholder';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { FetchError } from '@/src/components/molecules/fetchError/FetchError';
import { FollowButton } from '@/src/components/molecules/followButton/FollowButton';
import { containerVariants } from '@/src/components/molecules/imagesPreview/ImagesPreview.animation';
import { Loader } from '@/src/components/molecules/loader/Loader';

import { HomePost } from '@/src/components/organisms/homePost/HomePost';

import { useInfinitePosts } from '@/src/components/pages/home/useInfinitePosts';
import { useOtherUsers } from '@/src/components/pages/home/useOtherUsers';

import styles from './Home.module.scss';

export const newPostsAtom = atom(false);

export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } =
    useInfinitePosts();
  const { isSignedIn } = useAuth();
  const otherUsers = useOtherUsers();

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 100px 0px',
  });

  if (isError) {
    return <FetchError message="Cannot fetch data." />;
  }

  return (
    <div className={styles.home}>
      <motion.ul
        className={styles.posts}
        variants={containerVariants}
        animate="show"
        initial="hidden"
      >
        <NewPostNotification />
        {data?.pages.map((page) => {
          return page?.posts.map((post, idx) => {
            if (!post) {
              return <PostPlaceholder key={idx} />;
            }

            return <HomePost priority={idx < 3} key={post.id} post={post} />;
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

          {otherUsers.isLoading && <Loader color="blue" size="normal" />}
          {otherUsers.data && (
            <ul className={styles.asideList}>
              {otherUsers.data.map(({ id, username, name }) => {
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
