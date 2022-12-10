import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './home.module.scss';

import { HomepagePost } from '@/components/organisms/homepagePost/HomepagePost';
import { useInfinitePosts } from '@/components/pages/home/useInfinitePosts';

export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useInfinitePosts();

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });

  if (!data) {
    return <p>no data</p>;
  }

  return (
    <main className={styles.posts}>
      {data.pages.map((page) => {
        return page.posts.map(
          ({ images, id, author_id, _count, description, isLiked, created_at }) => {
            return (
              <HomepagePost
                key={id}
                postID={id}
                authorID={author_id}
                description={description}
                isLiked={Boolean(isLiked)}
                images={images}
                createdAt={created_at}
                likesCount={_count.posts_likes}
              />
            );
          }
        );
      })}
      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <p>loading...</p>
        </div>
      )}
    </main>
  );
};
