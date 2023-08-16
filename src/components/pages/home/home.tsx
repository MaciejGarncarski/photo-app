'use client';

import { motion } from 'framer-motion';

import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { FetchErrorMessage } from '@/src/components/fetch-error-message/fetch-error-message';
import { HomePost } from '@/src/components/home-post/home-post';
import { containerVariants } from '@/src/components/images-preview/images-preview.animation';
import { NewPostNotification } from '@/src/components/new-post-notification/new-post-notification';
import { useInfinitePosts } from '@/src/components/pages/home/use-posts';
import { PostPlaceholder } from '@/src/components/post/post-placeholder/post-placeholder';

import styles from './home.module.scss';

export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } =
    useInfinitePosts();

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  if (isError) {
    return <FetchErrorMessage message="Cannot fetch data." />;
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
          return page?.posts.map(({ id }, idx) => {
            return <HomePost priority={idx < 3} key={id} postId={id} />;
          });
        })}
        {!isLoading && hasNextPage && (
          <li ref={ref}>
            <PostPlaceholder />
            <PostPlaceholder />
          </li>
        )}
      </motion.ul>
    </div>
  );
};
