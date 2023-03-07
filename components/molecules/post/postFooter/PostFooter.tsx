import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { PostData } from '@/utils/transformPost';

import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { CommentForm } from '@/components/molecules/post/commentForm/CommentForm';
import { PostButtons } from '@/components/molecules/post/postButtons/PostButtons';
import { descriptionData } from '@/components/organisms/homePost/description';

import styles from './postFooter.module.scss';

type PropsTypes = {
  post: PostData;
  parentModalOpen?: boolean;
};

dayjs.extend(relativeTime);

export const PostFooter = ({ post, parentModalOpen }: PropsTypes) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const { isSignedIn } = useAuth();

  const { createdAt, description } = post;

  const { isDescriptionLong, shortDescription } = descriptionData(description);
  const fromNow = dayjs().to(dayjs(createdAt));
  const formattedDate = dayjs(createdAt).format('MMMM DD YYYY');
  const toggleShowMore = () => setShowMore((prev) => !prev);

  return (
    <footer className={styles.footer}>
      <PostButtons post={post} parentModalOpen={parentModalOpen} />
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
