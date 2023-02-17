import useInfiniteScroll from 'react-infinite-scroll-hook';

import { PostPlaceholder } from '@/components/atoms/postPlaceholder/PostPlaceholder';
import { HomepagePost } from '@/components/organisms/homepagePost/HomepagePost';
import { useInfinitePosts } from '@/components/pages/home/useInfinitePosts';

import styles from './home.module.scss';

export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useInfinitePosts();

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });

  if (isLoading) {
    return (
      <>
        {[0, 1, 2, 3].map((el) => {
          return <PostPlaceholder key={el} />;
        })}
      </>
    );
  }

  return (
    <main className={styles.posts} role="list">
      {data?.pages.map((page) => {
        return page?.posts.map((post, idx) => {
          return <HomepagePost priority={idx < 4} key={post.postId} post={post} />;
        });
      })}
      {isLoading && (
        <div ref={sentryRef}>
          <PostPlaceholder />
        </div>
      )}
    </main>
  );
};
