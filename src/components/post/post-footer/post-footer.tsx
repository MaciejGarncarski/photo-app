import { useAuth } from '@/src/hooks/use-auth';
import { useUser } from '@/src/hooks/use-user';

import { CommentForm } from '@/src/components/forms/comment-form/comment-form';
import { PostButtons } from '@/src/components/post/post-buttons/post-buttons';
import { usePostFooter } from '@/src/components/post/post-footer/use-post-footer';
import { Post } from '@/src/schemas/post.schema';

import styles from './post-footer.module.scss';

type Props = {
  post: Post;
  parentModalOpen?: boolean;
};

export const PostFooter = ({ post, parentModalOpen }: Props) => {
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
