import { useUser } from '@/src/hooks/useUser';
import { PostData } from '@/src/utils/apis/transformPost';

import { PostPlaceholder } from '@/src/components/atoms/postPlaceholder/PostPlaceholder';

import { PostFooter } from '@/src/components/organisms/post/postFooter/PostFooter';
import { PostHeader } from '@/src/components/organisms/post/postHeader/PostHeader';
import { PostSlider } from '@/src/components/organisms/post/postSlider/PostSlider';

import styles from './homePost.module.scss';

type PropsTypes = {
  post: PostData;
  priority: boolean;
};

export const HomePost = ({ post, priority }: PropsTypes) => {
  const { authorId, postId, createdAt } = post;
  const { isLoading } = useUser({ userId: post.authorId });

  if (isLoading) {
    return <PostPlaceholder />;
  }

  return (
    <li>
      <article className={styles.homePost}>
        <PostHeader authorId={authorId} createdAt={createdAt} postId={postId} />
        <PostSlider post={post} priority={priority} />
        <PostFooter post={post} />
      </article>
    </li>
  );
};
