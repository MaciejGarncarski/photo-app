import { PostData } from '@/utils/apis/transformPost';

import { PostFooter } from '@/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/components/molecules/post/postHeader/PostHeader';
import { PostSlider } from '@/components/molecules/post/postSlider/PostSlider';

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
