import { motion, Variants } from 'framer-motion';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { AccountPost } from '@/components/atoms/accountPost/AccountPost';
import { Loader } from '@/components/atoms/loader/Loader';
import { useAccountPosts } from '@/components/organisms/accountPosts/useAccountPosts';

import styles from './accountPosts.module.scss';

type PropsTypes = {
  id: string;
};

const postContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const AccountPosts = ({ id }: PropsTypes) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } = useAccountPosts({ userId: id });

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError || !hasNextPage,
    rootMargin: '0px 0px 300px 0px',
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
      <motion.div variants={postContainerVariants} initial="hidden" animate="show" className={styles.posts}>
        {data.pages.map((page) => {
          return page.posts.map((post) => {
            return <AccountPost key={post.postId} post={post} />;
          });
        })}
      </motion.div>
      {data.pages[0].postsCount !== 0 && (
        <>
          {hasNextPage && (
            <div ref={infiniteRef} className={styles.loading}>
              <Loader />
            </div>
          )}
        </>
      )}
    </>
  );
};
