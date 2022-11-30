import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Post } from '@/components/organisms/post/Post';
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

  console.log(data);

  if (!data) {
    return <p>no data</p>;
  }

  return (
    <main>
      {data.pages.map((page) => {
        return page.posts.map(({ images, id, author_id }) => {
          return <Post author={author_id} key={id} images={images} />;
        });
      })}
      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <p>loading...</p>
        </div>
      )}
    </main>
  );
};
