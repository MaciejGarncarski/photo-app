import { NextSeo } from 'next-seo';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { useAuth } from '@/hooks/useAuth';

import { Heading } from '@/components/atoms/heading/Heading';
import { Loading } from '@/components/atoms/loading/Loading';
import { PostPlaceholder } from '@/components/atoms/postPlaceholder/PostPlaceholder';
import { CollectionPost } from '@/components/organisms/collectionPost/CollectionPost';
import { useCollection } from '@/components/pages/collection/useCollection';

import styles from './collection.module.scss';

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
        return page.posts.map((post) => {
          return <CollectionPost post={post} key={post.postId} />;
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
