import { NextSeo } from 'next-seo';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './collection.module.scss';

import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { HomepagePost } from '@/components/organisms/homepagePost/HomepagePost';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useCollection } from '@/components/pages/collection/useCollection';

export const Collection = () => {
  const { session } = useAuth();

  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useCollection({ userId: session?.user?.id ?? '' });

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 100px 0px',
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return null;
  }

  const isEmpty = data.pages[0].posts.length < 1;

  return (
    <main className={styles.container}>
      <NextSeo title="Post collection" />
      <Heading tag="h2" className={styles.heading}>
        Your post collection
      </Heading>
      {isEmpty && <p>No saved posts.</p>}
      {data.pages.map((page) => {
        return page.posts.map((post, idx) => {
          return <HomepagePost isPriority={idx < 6} key={post.id} post={post} />;
        });
      })}
      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <Loading />
        </div>
      )}
    </main>
  );
};
