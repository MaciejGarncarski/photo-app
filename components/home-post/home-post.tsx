import { motion } from 'framer-motion';

import { usePost } from '@/components/pages/account/use-post';
import { PostFooter } from '@/components/post/post-footer/post-footer';
import { PostHeader } from '@/components/post/post-header/post-header';
import { PostImagesCarousel } from '@/components/post/post-images-carousel/post-images-carousel';
import { PostPlaceholder } from '@/components/post/post-placeholder/post-placeholder';

import styles from './home-post.module.scss';

type Props = {
  postId: number;
  priority: boolean;
};

export const HomePost = ({ postId, priority }: Props) => {
  const { isPending } = usePost({ postId });

  if (isPending) {
    return <PostPlaceholder />;
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.homePost}
    >
      <div className={styles.header}>
        <PostHeader postId={postId} />
      </div>
      <div className={styles.carousel}>
        <PostImagesCarousel postId={postId} priority={priority} />
      </div>
      <PostFooter postId={postId} />
    </motion.article>
  );
};
