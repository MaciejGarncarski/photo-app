'use client';

import { PlusCircle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

import { useAuth } from '@/hooks/use-auth';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

import { ButtonLink } from '@/components/buttons/button-link/button-link';
import { FetchErrorMessage } from '@/components/fetch-error-message/fetch-error-message';
import { HomePost } from '@/components/home-post/home-post';
import { Loader } from '@/components/loader/loader';
import { NewPostNotification } from '@/components/new-post-notification/new-post-notification';
import { useHomepagePosts } from '@/components/pages/home/use-homepage-posts';
import { PostPlaceholder } from '@/components/post/post-placeholder/post-placeholder';

import styles from './home.module.scss';

export const Home = () => {
  const { data, isPending, hasNextPage, fetchNextPage, isError } =
    useHomepagePosts();

  const { isSignedIn } = useAuth();

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  if (isError) {
    return <FetchErrorMessage message="Cannot fetch data." />;
  }

  if (isPending) {
    return (
      <motion.div className={styles.posts}>
        <PostPlaceholder />
        <PostPlaceholder />
        <PostPlaceholder />
      </motion.div>
    );
  }

  const noPosts = data?.pages[0] && data.pages[0].postsCount < 1;

  return (
    <motion.div className={styles.posts}>
      <NewPostNotification />
      {noPosts ? (
        <div className={styles.noPosts}>
          <p>No posts yet.</p>
          {isSignedIn && (
            <ButtonLink href="/create-post">
              <PlusCircle />
              Create post now
            </ButtonLink>
          )}
        </div>
      ) : null}

      {data?.pages.map((page) => {
        return page.data.map(({ id }, idx) => {
          return <HomePost priority={idx < 3} key={id} postId={id} />;
        });
      })}

      {!isPending && hasNextPage && (
        <div role="status" ref={ref}>
          <Loader size="small" color="primary" />
        </div>
      )}
    </motion.div>
  );
};
