import { usePost } from '@/src/components/pages/account/use-post';
import { PostFooter } from '@/src/components/post/post-footer/post-footer';
import { PostHeader } from '@/src/components/post/post-header/post-header';
import { PostImagesCarousel } from '@/src/components/post/post-images-carousel/post-images-carousel';

import styles from './home-post.module.scss';

type Props = {
  postId: number;
  priority: boolean;
};

export const HomePost = ({ postId, priority }: Props) => {
  const { data: post, isLoading } = usePost({ postId });

  if (isLoading || !post) {
    return null;
  }

  const { authorId, createdAt } = post;

  return (
    <li>
      <article className={styles.homePost}>
        <PostHeader
          authorId={authorId}
          createdAt={createdAt.toString()}
          postId={postId}
        />
        <PostImagesCarousel postId={postId} priority={priority} />
        <PostFooter postId={postId} />
      </article>
    </li>
  );
};
