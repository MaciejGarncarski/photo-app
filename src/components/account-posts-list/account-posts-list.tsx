import { motion } from 'framer-motion';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import { AccountPost } from '@/src/components/account-post/account-post';
import { postContainerVariants } from '@/src/components/account-posts-list/account-posts-list.animation';
import { useAccountPosts } from '@/src/components/account-posts-list/use-account-posts';
import { Loader } from '@/src/components/loader/loader';

import styles from './account-posts-list.module.scss';

type PropsTypes = {
  userId: string;
};

export const AccountPostsList = ({ userId }: PropsTypes) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isError } =
    useAccountPosts({ userId });

  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
    disabled: isError || !hasNextPage,
    rootMargin: '0px 0px 300px 0px',
  });

  if (!data || isLoading) {
    return <Loader marginTop color="blue" size="normal" />;
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
          return page.posts.map(
            ({ id, isLiked, images, commentsCount, likesCount }) => {
              if (!images) {
                return null;
              }

              const firstImageFromSlider = images[0];

              if (!firstImageFromSlider) {
                return <Loader size="normal" color="blue" key={id} />;
              }

              const { url, width, height } = firstImageFromSlider;

              return (
                <AccountPost
                  imageUrl={url}
                  height={height}
                  width={width}
                  key={id}
                  isLiked={isLiked}
                  postId={id}
                  commentsCount={commentsCount}
                  likesCount={likesCount}
                />
              );
            },
          );
        })}
      </motion.div>
      {hasNextPage && hasPosts && (
        <div ref={infiniteRef} className={styles.loading}>
          <Loader color="blue" size="normal" />
        </div>
      )}
    </>
  );
};
