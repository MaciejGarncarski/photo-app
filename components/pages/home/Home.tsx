import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './home.module.scss';

import { Loading } from '@/components/atoms/loading/Loading';
import { HomepagePost } from '@/components/organisms/homepagePost/HomepagePost';
import { PostData } from '@/components/pages/collection/useCollection';
import { useInfinitePosts } from '@/components/pages/home/useInfinitePosts';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

type HomeProps = {
  initialData?: InfinitePosts<PostData>;
};

export const Home = ({ initialData }: HomeProps) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useInfinitePosts({ initialData });

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 100px 0px',
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  return (
    <main className={styles.posts}>
      {data.pages.map((page) => {
        return page?.posts.map((post) => {
          return <HomepagePost key={post.id} post={post} />;
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
