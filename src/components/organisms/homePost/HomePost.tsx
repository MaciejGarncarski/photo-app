import { PostData } from '@/src/utils/apis/transformPost';

import { PostFooter } from '@/src/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/src/components/molecules/post/postHeader/PostHeader';
import { PostSlider } from '@/src/components/molecules/post/postSlider/PostSlider';

import styles from './homePost.module.scss';

type PropsTypes = {
  post: PostData;
  priority: boolean;
};

export const HomePost = ({ post, priority }: PropsTypes) => {
  return (
    <li>
      <article className={styles.homePost}>
        <PostHeader post={post} />
        <PostSlider post={post} priority={priority} />
        <PostFooter post={post} />
      </article>
    </li>
  );
};
