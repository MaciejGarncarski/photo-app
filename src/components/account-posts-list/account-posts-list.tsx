import { motion } from 'framer-motion';

import { useInfiniteScroll } from '@/src/hooks/use-infinite-scroll';

import { AccountPost } from '@/src/components/account-post/account-post';
import { postContainerVariants } from '@/src/components/account-posts-list/account-posts-list.animation';
import { useAccountPosts } from '@/src/components/account-posts-list/use-account-posts';
import { Loader } from '@/src/components/loader/loader';

import styles from './account-posts-list.module.scss';

type Props = {
  userId: string;
};

export const AccountPostsList = ({ userId }: Props) => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useAccountPosts({
    userId,
  });

  const { ref } = useInfiniteScroll({
    hasNextPage: Boolean(hasNextPage),
    fetchNextPage,
    enabled: true,
  });

  if (!data || isLoading) {
    return <Loader marginTop color="accent" size="big" />;
  }

  const hasPosts = data.pages[0].postsCount !== 0;

  return (
    <>
      <motion.div
        variants={postContainerVariants}
        initial="hidden"
        animate="show"
        className={styles.posts}
      >
        {data.pages.map((page) => {
          return page.posts.map(({ id }) => {
            return <AccountPost key={id} postId={id} />;
          });
        })}
      </motion.div>
      {hasNextPage && hasPosts && !isLoading && (
        <div ref={ref} className={styles.loading}>
          <Loader color="accent" size="big" />
        </div>
      )}
    </>
  );
};
