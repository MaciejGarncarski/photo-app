import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { Account, useUser } from '@/hooks/useUser';

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
  authorData?: Account;
  priority: boolean;
};

dayjs.extend(relativeTime);

export const HomepagePost = ({ post, priority }: HomePagePostProps) => {
  const { session } = useAuth();
  const { author_id, description, created_at, likesCount } = post;
  const { isLoading, username } = useUser({ userId: author_id });
  const [showMore, setShowMore] = useState<boolean>(false);

  const { isDescriptionLong, hasMultipleBreaks, shortDescription } = descriptionData(description);

  const fromNow = dayjs().to(dayjs(created_at));
  const formattedDate = dayjs(created_at).format('MMMM DD YYYY');

  const Description = () => {
    if (isDescriptionLong || hasMultipleBreaks) {
      return (
        <>
          {showMore ? description : shortDescription}
          &nbsp;
          <button className={styles.showMore} type="button" onClick={() => setShowMore((prev) => !prev)}>
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
            <time dateTime={created_at.toString()}>{fromNow}</time>
          </Tooltip>
        </p>
        {session?.user && <CommentForm post={post} />}
      </footer>
    </article>
  );
};
