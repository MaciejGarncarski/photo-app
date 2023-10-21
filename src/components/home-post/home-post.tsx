import { usePost } from '@/src/components/pages/account/use-post';
import { PostFooter } from '@/src/components/post/post-footer/post-footer';
import { PostHeader } from '@/src/components/post/post-header/post-header';
import { PostImagesCarousel } from '@/src/components/post/post-images-carousel/post-images-carousel';
import { PostPlaceholder } from '@/src/components/post/post-placeholder/post-placeholder';

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
    <li>
      <article className={styles.homePost}>
        <PostHeader postId={postId} />
        <PostImagesCarousel postId={postId} priority={priority} />
        <PostFooter postId={postId} />
      </article>
    </li>
  );
};
