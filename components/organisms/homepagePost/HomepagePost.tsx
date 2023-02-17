import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

import { PostPlaceholder } from '@/components/atoms/postPlaceholder/PostPlaceholder';
import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { CommentForm } from '@/components/molecules/commentForm/CommentForm';
import { PostButtons } from '@/components/molecules/postButtons/PostButtons';
import { PostHeader } from '@/components/molecules/postHeader/PostHeader';
import { PostSlider } from '@/components/molecules/postSlider/PostSlider';
import { descriptionData } from '@/components/organisms/homepagePost/description';
import { PostData } from '@/components/pages/collection/useCollection';

import styles from './homepagePost.module.scss';

type HomePagePostProps = {
  post: PostData;
  priority: boolean;
};

dayjs.extend(relativeTime);

export const HomepagePost = ({ post, priority }: HomePagePostProps) => {
  const { session } = useAuth();
  const { authorId, description, createdAt, likesCount, postPlaceholders } = post;
  const { isLoading, username } = useUser({ userId: authorId });
  const [showMore, setShowMore] = useState<boolean>(false);

  const { isDescriptionLong, shortDescription } = descriptionData(description);

  const fromNow = dayjs().to(dayjs(createdAt));
  const formattedDate = dayjs(createdAt).format('MMMM DD YYYY');
  const toggleShowMore = () => setShowMore((prev) => !prev);

  const Description = () => {
    if (isDescriptionLong) {
      return (
        <>
          {showMore ? description : shortDescription}
          &nbsp;
          <button className={styles.showMore} type="button" onClick={toggleShowMore}>
            show {showMore ? 'less' : 'more'}
          </button>
        </>
      );
    }

    return <>{description}</>;
  };

  if (isLoading) {
    return <PostPlaceholder />;
  }

  return (
    <article className={styles.post}>
      <PostHeader post={post} />
      <PostSlider post={post} priority={priority} />
      <PostButtons post={post} />
      <footer className={styles.bottom}>
        {likesCount !== 0 && (
          <p className={styles.count}>
            {likesCount}
            &nbsp;
            {likesCount === 1 && 'like'}
            {likesCount > 1 && 'likes'}
          </p>
        )}
        <p className={styles.description}>
          <span className={styles.author}>{username}</span>
          <Description />
        </p>
        <p className={styles.date}>
          <Tooltip variant="top" content={formattedDate}>
            <time dateTime={createdAt.toString()}>{fromNow}</time>
          </Tooltip>
        </p>
        {session?.user && <CommentForm post={post} />}
      </footer>
    </article>
  );
};
