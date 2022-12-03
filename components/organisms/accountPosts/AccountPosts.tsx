// import syles from './accountPosts.module.scss';

import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { InfinitePost } from '@/pages/api/post/infinitePosts';

type AccountPostsProps = {
  id: string;
};

export const AccountPosts = ({ id }: AccountPostsProps) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useInfiniteQuery(
    ['account posts', id],
    async ({ pageParam = 0 }) => {
      const { data: axiosData } = await axios.get<InfinitePost>(
        `/api/post/infinitePosts/${id}?skip=${pageParam}`
      );
      return axiosData;
    }
  );

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
    <div>
      {data.pages.map((page) => {
        return page.posts.map(({ images, id, author_id }) => {
          return <p key={id}>im a post</p>;
        });
      })}
      {(isLoading || hasNextPage) && (
        <div ref={sentryRef}>
          <p>loading...</p>
        </div>
      )}
    </div>
  );
};
