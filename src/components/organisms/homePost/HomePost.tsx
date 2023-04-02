import { useUser } from '@/src/hooks/useUser';
import { PostData } from '@/src/utils/apis/transformPost';

import { PostPlaceholder } from '@/src/components/atoms/postPlaceholder/PostPlaceholder';
import { PostFooter } from '@/src/components/molecules/post/postFooter/PostFooter';
import { PostHeader } from '@/src/components/molecules/post/postHeader/PostHeader';
import { PostSlider } from '@/src/components/molecules/post/postSlider/PostSlider';

import styles from './homePost.module.scss';

type PropsTypes = {
  post: PostData;
  priority: boolean;
};

export const HomePost = ({ post, priority }: PropsTypes) => {
  const { isLoading } = useUser({ userId: post.authorId });

  if (isLoading) {
    return <PostPlaceholder />;
  }

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
