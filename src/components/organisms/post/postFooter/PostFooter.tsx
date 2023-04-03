import { useAuth } from '@/src/hooks/useAuth';
import { PostData } from '@/src/utils/apis/transformPost';

import { CommentForm } from '@/src/components/organisms/post/commentForm/CommentForm';
import { PostButtons } from '@/src/components/organisms/post/postButtons/PostButtons';
import { usePostFooter } from '@/src/components/organisms/post/postFooter/usePostFooter';

import styles from './postFooter.module.scss';

type PropsTypes = {
  post: PostData;
  parentModalOpen?: boolean;
};

export const PostFooter = ({ post, parentModalOpen }: PropsTypes) => {
  const { isSignedIn } = useAuth();
  const { description, author } = post;
  const { isDescriptionLong, shortDescription, showMore, toggleShowMore } = usePostFooter({ description });

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
      {isSignedIn && <CommentForm postId={post.postId} />}
    </footer>
  );
};
