import { PostFooter } from '@/src/components/organisms/post/postFooter/PostFooter';
import { PostHeader } from '@/src/components/organisms/post/postHeader/PostHeader';
import { PostSlider } from '@/src/components/organisms/post/postSlider/PostSlider';

import { Post } from '@/src/schemas/post.schema';

import styles from './HomePost.module.scss';

type PropsTypes = {
  post: Post;
  priority: boolean;
};

export const HomePost = ({ post, priority }: PropsTypes) => {
  const { authorId, id, createdAt } = post;

  return (
    <li>
      <article className={styles.homePost}>
        <PostHeader authorId={authorId} createdAt={createdAt.toString()} postId={id} />
        <PostSlider post={post} priority={priority} />
        <PostFooter post={post} />
      </article>
    </li>
  );
};
