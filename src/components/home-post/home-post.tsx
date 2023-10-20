import { PostFooter } from '@/src/components/post/post-footer/post-footer';
import { PostHeader } from '@/src/components/post/post-header/post-header';
import { PostImagesCarousel } from '@/src/components/post/post-images-carousel/post-images-carousel';

import styles from './home-post.module.scss';

type Props = {
  postId: number;
  priority: boolean;
};

export const HomePost = ({ postId, priority }: Props) => {
  return (
    <li>
      <article className={styles.homePost}>
        <PostHeader postId={postId} />
        <PostImagesCarousel postId={postId} priority={priority} />
        <PostFooter postId={postId} />
      </article>
    </li>
  );
};
