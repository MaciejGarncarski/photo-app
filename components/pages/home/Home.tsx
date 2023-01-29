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
    rootMargin: '0px 0px 100px 0px',
  });

  if (isLoading || !data) {
    return <PostPlaceholder />;
  }

  return (
    <main className={styles.posts}>
      {data.pages.map((page) => {
        return page?.posts.map((post, idx) => {
          return <HomepagePost priority={idx < 4} key={post.id} post={post} />;
        });
      })}
      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <PostPlaceholder />
        </div>
      )}
    </main>
  );
};
