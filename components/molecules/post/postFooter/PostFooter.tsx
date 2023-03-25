import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { PostData } from '@/utils/apis/transformPost';

import { CommentForm } from '@/components/molecules/post/commentForm/CommentForm';
import { PostButtons } from '@/components/molecules/post/postButtons/PostButtons';
import { descriptionData } from '@/components/organisms/homePost/description';

import styles from './postFooter.module.scss';

type PropsTypes = {
  post: PostData;
  parentModalOpen?: boolean;
};

export const PostFooter = ({ post, parentModalOpen }: PropsTypes) => {
  const { isSignedIn } = useAuth();
  const [showMore, setShowMore] = useState<boolean>(false);

  const { description } = post;
  const { isDescriptionLong, shortDescription } = descriptionData(description);

  const toggleShowMore = () => setShowMore((prev) => !prev);

  return (
    <footer className={styles.footer}>
      <PostButtons post={post} parentModalOpen={parentModalOpen} />
      <div className={styles.descriptionContainer}>
        <p className={styles.author}>{post.author.username}</p>
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
