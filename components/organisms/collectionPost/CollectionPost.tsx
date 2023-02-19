import Link from 'next/link';

import { PostHeader } from '@/components/molecules/postHeader/PostHeader';
import { PostSlider } from '@/components/molecules/postSlider/PostSlider';
import { PostData } from '@/components/pages/collection/useCollection';

import styles from './collectionPost.module.scss';

type PropsTypes = {
  post: PostData;
};

export const CollectionPost = ({ post }: PropsTypes) => {
  return (
    <article className={styles.post}>
      <PostHeader post={post} />
      <Link href={`/post/${post.postId}`}>
        <PostSlider post={post} />
      </Link>
    </article>
  );
};
