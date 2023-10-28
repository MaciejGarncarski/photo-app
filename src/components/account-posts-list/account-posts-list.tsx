import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { AccountPost } from '@/src/components/account-post/account-post';
import { useAccountPosts } from '@/src/components/account-posts-list/use-account-posts';
import { Loader } from '@/src/components/loader/loader';

import styles from './account-posts-list.module.scss';

type Props = {
  userId: string;
};

export const AccountPostsList = ({ userId }: Props) => {
  const { data, isPending, hasNextPage, fetchNextPage } = useAccountPosts({
    userId,
  });

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  if (!data || isPending) {
    return <Loader marginTop color="accent" size="big" />;
  }

  const hasPosts = data.pages[0].postsCount !== 0;

  return (
    <>
      <div className={styles.posts}>
        {!hasPosts && <p className={styles.noPosts}>No posts yet.</p>}
        {data.pages.map((page) => {
          return page.data.map(({ id }) => {
            return <AccountPost key={id} postId={id} />;
          });
        })}
      </div>
      {hasNextPage && hasPosts && !isPending && (
        <div ref={ref} className={styles.loading}>
          <Loader color="primary" size="big" />
        </div>
      )}
    </>
  );
};
