import { PostData } from '@/utils/transformPost';

import { PostFooter } from '@/components/molecules/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/postHeader/PostHeader';
import { PostSlider } from '@/components/molecules/postSlider/PostSlider';

import styles from './homePost.module.scss';

type PropsTypes = {
  post: PostData;
  priority: boolean;
};

export const HomePost = ({ post }: PropsTypes) => {
  return (
    <article role="listitem" className={styles.homePost}>
      <PostHeader post={post} />
      <PostSlider post={post} />
      <PostFooter post={post} />
    </article>
  );
};
