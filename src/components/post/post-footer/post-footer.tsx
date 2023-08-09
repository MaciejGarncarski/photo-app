import { useAuth } from '@/src/hooks/useAuth';
import { useUser } from '@/src/hooks/useUser';

import { CommentForm } from '@/src/components/organisms/post/commentForm/CommentForm';
import { PostButtons } from '@/src/components/organisms/post/postButtons/PostButtons';
import { usePostFooter } from '@/src/components/organisms/post/postFooter/usePostFooter';

import { Post } from '@/src/schemas/post.schema';

import styles from './PostFooter.module.scss';

type PropsTypes = {
  post: Post;
  parentModalOpen?: boolean;
};

export const PostFooter = ({ post, parentModalOpen }: PropsTypes) => {
  const { isSignedIn } = useAuth();
  const { description, authorId, id } = post;
  const { data } = useUser({ userId: authorId });
  const { isDescriptionLong, shortDescription, showMore, toggleShowMore } =
    usePostFooter({ description });

  return (
    <footer className={styles.footer}>
      <PostButtons post={post} parentModalOpen={parentModalOpen} />
      <div className={styles.descriptionContainer}>
        <p className={styles.author}>{data?.username}</p>
        {isDescriptionLong ? (
          <>
            <p className={styles.description}>
              {showMore ? description : shortDescription}
            </p>
            &nbsp;
            <button
              className={styles.showMore}
              type="button"
              onClick={toggleShowMore}
            >
              show {showMore ? 'less' : 'more'}
            </button>
          </>
        ) : (
          <p className={styles.description}>{description}</p>
        )}
      </div>
      {isSignedIn && <CommentForm postId={id} />}
    </footer>
  );
};
