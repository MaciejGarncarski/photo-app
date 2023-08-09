import { PostFooter } from '@/src/components/post/post-footer/post-footer';
import { PostHeader } from '@/src/components/post/post-header/post-header';
import { PostImagesCarousel } from '@/src/components/post/post-images-carousel/post-images-carousel';
import { Post } from '@/src/schemas/post.schema';

import styles from './home-post.module.scss';

type Props = {
  post: Post;
  priority: boolean;
};

export const HomePost = ({ post, priority }: Props) => {
  const { authorId, id, createdAt } = post;

  return (
    <li>
      <article className={styles.homePost}>
        <PostHeader
          authorId={authorId}
          createdAt={createdAt.toString()}
          postId={id}
        />
        <PostImagesCarousel post={post} priority={priority} />
        <PostFooter post={post} />
      </article>
    </li>
  );
};
