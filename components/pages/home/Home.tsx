import { atom } from 'jotai';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Heading } from '@/components/atoms/heading/Heading';
import { NewPostNotification } from '@/components/atoms/newPostNotification/NewPostNotification';
import { PostPlaceholder } from '@/components/atoms/postPlaceholder/PostPlaceholder';
import { LayoutSearch } from '@/components/molecules/layoutSearch/LayoutSearch';
import { HomePost } from '@/components/organisms/homePost/HomePost';
import { useInfinitePosts } from '@/components/pages/home/useInfinitePosts';

import styles from './home.module.scss';

export const newPostsAtom = atom<boolean>(false);

export const Home = () => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useInfinitePosts();
  // useRealtimeInfinitePosts();

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <div className={styles.home}>
      <main className={styles.posts} role="list">
        <NewPostNotification />
        {data?.pages.map((page) => {
          return page?.posts.map((post, idx) => {
            return <HomePost priority={idx < 4} key={post.postId} post={post} />;
          });
        })}
        {isLoading && (
          <div ref={sentryRef}>
            {[0, 1, 2].map((el) => {
              return <PostPlaceholder key={el} />;
            })}
          </div>
        )}
      </main>

      <aside className={styles.aside}>
        <LayoutSearch />
        <section className={styles.asideItem}>
          <Heading tag="h3" className={styles.heading}>
            Who to follow
          </Heading>
          dsadasds
        </section>
      </aside>
    </div>
  );
};
