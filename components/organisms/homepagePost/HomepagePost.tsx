import { PostFooter } from '@/components/molecules/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/postHeader/PostHeader';
import { PostSlider } from '@/components/molecules/postSlider/PostSlider';
import { PostData } from '@/components/pages/collection/useCollection';

import styles from './homepagePost.module.scss';

type PropsTypes = {
  post: PostData;
  priority: boolean;
};

export const HomepagePost = ({ post }: PropsTypes) => {
  return (
    <article className={styles.post} role="listitem">
      <PostHeader post={post} />
      <PostSlider post={post} />
      <PostFooter post={post} />
    </article>
  );
};
