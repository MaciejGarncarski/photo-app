import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { PostData } from '@/utils/transformPost';

import { AccountPost } from '@/components/atoms/accountPost/AccountPost';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

import styles from './accountPosts.module.scss';

type PropsTypes = {
  id: string;
};

export const AccountPosts = ({ id }: PropsTypes) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useInfiniteQuery(
    [{ accountPosts: id }],
    async ({ pageParam = 0 }) => {
      const { data: axiosData } = await axios.get<InfinitePosts<PostData>>(
        `/api/post/infinitePosts/${id}?skip=${pageParam}`,
      );
      return axiosData;
    },
  );

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError,
    rootMargin: '0px 0px 400px 0px',
  });

  if (!data || isLoading) {
    return (
      <div className={styles.posts}>
        {Array.from({ length: 6 }, (_, item) => item).map((el) => {
          return <div className={styles.placeholder} key={el} />;
        })}
      </div>
    );
  }

  return (
    <>
      <div className={styles.posts}>
        {data.pages.map((page) => {
          return page.posts.map((post) => {
            return <AccountPost key={post.postId} post={post} />;
          });
        })}
      </div>

      {(isLoading || hasNextPage) && (
        <div ref={sentryRef} className={styles.posts}>
          {Array.from({ length: 6 }, (_, item) => item).map((el) => {
            return <div className={styles.placeholder} key={el} />;
          })}
        </div>
      )}
    </>
  );
};
