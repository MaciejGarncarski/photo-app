import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import styles from './accountPosts.module.scss';

import { AccountPost } from '@/components/atoms/accountPost/AccountPost';
import { Loading } from '@/components/atoms/loading/Loading';
import { PostData } from '@/components/pages/collection/useCollection';

import { InfinitePosts } from '@/pages/api/post/infinitePosts';

type AccountPostsProps = {
  id: string;
};

export const AccountPosts = ({ id }: AccountPostsProps) => {
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
    return <Loading />;
  }

  return (
    <div className={styles.posts}>
      {data.pages.map((page) => {
        return page.posts.map((post) => {
          return <AccountPost key={post.id} post={post} />;
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
