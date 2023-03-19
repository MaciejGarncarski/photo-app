import { motion } from 'framer-motion';
import { atom } from 'jotai';
import Link from 'next/link';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/hooks/useAuth';
import { useOtherUsers } from '@/hooks/useOtherUsers';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/buttons/followButton/FollowButton';
import { Heading } from '@/components/atoms/heading/Heading';
import { NewPostNotification } from '@/components/atoms/newPostNotification/NewPostNotification';
import { PostPlaceholder } from '@/components/atoms/postPlaceholder/PostPlaceholder';
import { containerVariants } from '@/components/molecules/imagesPreview/ImagesPreview';
import { HomePost } from '@/components/organisms/homePost/HomePost';
import { useInfinitePosts } from '@/components/pages/home/useInfinitePosts';

import styles from './home.module.scss';

export const newPostsAtom = atom<boolean>(false);

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
      <motion.main className={styles.posts} variants={containerVariants} animate="show" initial="hidden" role="list">
        <NewPostNotification />
        {data?.pages.map((page) => {
          return page?.posts.map((post, idx) => {
            return <HomePost priority={idx < 4} key={post.postId} post={post} />;
          });
        })}
        {(isLoading || hasNextPage) && (
          <div ref={sentryRef}>
            <PostPlaceholder />
            <PostPlaceholder />
          </div>
        )}
      </motion.main>

      <aside className={styles.aside}>
        <section className={styles.asideItem}>
          <Heading tag="h2" className={styles.heading}>
            New PhotoApp users
          </Heading>
          {otherUsers.data && (
            <ul className={styles.asideList}>
              {otherUsers?.data &&
                otherUsers.data.map(({ id, username, name }) => {
                  return (
                    <li key={id} className={styles.asideListItem}>
                      <Link href={`/${username}`} className={styles.link}>
                        <Avatar userId={id} className={styles.avatar} />
                        <div className={styles.names}>
                          <p className={styles.fullName}>{name}</p>
                          <p className={styles.username}>@{username}</p>
                        </div>
                      </Link>
                      {isSignedIn && <FollowButton className={styles.asideFollowButton} userId={id} />}
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
