import { motion } from 'framer-motion';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { AccountPost } from '@/src/components/atoms/accountPost/AccountPost';

import { Loader } from '@/src/components/molecules/loader/Loader';

import { postContainerVariants } from '@/src/components/organisms/accountPosts/AccountPosts.animation';
import { useAccountPosts } from '@/src/components/organisms/accountPosts/useAccountPosts';

import styles from './accountPosts.module.scss';

type PropsTypes = {
  id: string;
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
    return <Loader color="blue" size="normal" />;
  }

  const hasPosts = data.pages[0].postsCount !== 0;

  return (
    <>
      <motion.div variants={postContainerVariants} initial="hidden" animate="show" className={styles.posts}>
        {data.pages.map((page) => {
          return page.posts.map((post) => {
            if (!post.imagesData[0]) {
              return <Loader size="normal" color="blue" key={post.postId} />;
            }

            return <AccountPost key={post.postId} image={post.imagesData[0]} post={post} />;
          });
        })}
      </motion.div>
      {hasNextPage && hasPosts && (
        <div ref={infiniteRef} className={styles.loading}>
          <Loader color="blue" size="normal" />;
        </div>
      )}
    </>
  );
};
