import { motion } from 'framer-motion';
import { atom } from 'jotai';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { NewPostNotification } from '@/src/components/atoms/newPostNotification/NewPostNotification';
import { PostPlaceholder } from '@/src/components/atoms/postPlaceholder/PostPlaceholder';

import { FetchError } from '@/src/components/molecules/fetchError/FetchError';
import { containerVariants } from '@/src/components/molecules/imagesPreview/ImagesPreview.animation';

import { HomePost } from '@/src/components/organisms/homePost/HomePost';

import { useInfinitePosts } from '@/src/components/pages/home/useInfinitePosts';

import styles from './Home.module.scss';

export const newPostsAtom = atom(false);

export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } =
    useInfinitePosts();

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
    </div>
  );
};
