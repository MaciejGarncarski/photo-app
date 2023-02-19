import clsx from 'clsx';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { CommentForm } from '@/components/molecules/commentForm/CommentForm';
import { PostButtons } from '@/components/molecules/postButtons/PostButtons';
import { descriptionData } from '@/components/organisms/homepagePost/description';
import { PostData } from '@/components/pages/collection/useCollection';

import styles from './postFooter.module.scss';

type PropsTypes = {
  post: PostData;
  className?: string;
};

dayjs.extend(relativeTime);

export const PostFooter = ({ post, className }: PropsTypes) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const { isSignedIn } = useAuth();

  const { createdAt, description } = post;

  const { isDescriptionLong, shortDescription } = descriptionData(description);
  const fromNow = dayjs().to(dayjs(createdAt));
  const formattedDate = dayjs(createdAt).format('MMMM DD YYYY');
  const toggleShowMore = () => setShowMore((prev) => !prev);

  return (
    <footer className={clsx(className, styles.footer)}>
      <PostButtons post={post} />
      <div className={styles.descriptionContainer}>
        <span className={styles.author}>{post.author.username}</span>

        {isDescriptionLong ? (
          <>
            <p className={styles.description}>{showMore ? description : shortDescription}</p>
            &nbsp;
            <button className={styles.showMore} type="button" onClick={toggleShowMore}>
              show {showMore ? 'less' : 'more'}
            </button>
          </>
        ) : (
          <p className={styles.description}>{description}</p>
        )}
      </div>
      <p className={styles.date}>
        <Tooltip variant="top" content={formattedDate}>
          <time dateTime={createdAt.toString()}>{fromNow}</time>
        </Tooltip>
      </p>
      {isSignedIn && <CommentForm post={post} />}
    </footer>
  );
};
