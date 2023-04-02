import { useState } from 'react';

import { useAuth } from '@/src/hooks/useAuth';
import { PostData } from '@/src/utils/apis/transformPost';
import { getDescriptionData } from '@/src/utils/getDescriptionData';

import { CommentForm } from '@/src/components/molecules/post/commentForm/CommentForm';
import { PostButtons } from '@/src/components/molecules/post/postButtons/PostButtons';

import styles from './postFooter.module.scss';

type PropsTypes = {
  post: PostData;
  parentModalOpen?: boolean;
};

export const PostFooter = ({ post, parentModalOpen }: PropsTypes) => {
  const { isSignedIn } = useAuth();
  const [showMore, setShowMore] = useState(false);
  const { description, author } = post;

  const { isDescriptionLong, shortDescription } = getDescriptionData(description);

  const toggleShowMore = () => setShowMore((prev) => !prev);

  return (
    <footer className={styles.footer}>
      <PostButtons post={post} parentModalOpen={parentModalOpen} />
      <div className={styles.descriptionContainer}>
        <p className={styles.author}>{author?.username}</p>
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
      {isSignedIn && <CommentForm post={post} />}
    </footer>
  );
};
