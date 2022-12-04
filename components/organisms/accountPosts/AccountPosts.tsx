import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './accountPosts.module.scss';

import { AccountPost } from '@/components/atoms/accountPost/AccountPost';

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
    <div className={styles.posts}>
      {data.pages.map((page) => {
        return page.posts.map(({ images, id, author_id, _count }) => {
          return (
            <AccountPost
              key={id}
              authorID={author_id}
              src={images}
              likesCount={_count.posts_likes}
              commentsCount={_count.posts_comments}
            />
          );
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
