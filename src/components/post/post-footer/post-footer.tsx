import { useAuth } from '@/src/hooks/use-auth';
import { useUser } from '@/src/hooks/use-user';

import { CommentForm } from '@/src/components/forms/comment-form/comment-form';
import { usePost } from '@/src/components/pages/account/use-post';
import { PostButtons } from '@/src/components/post/post-buttons/post-buttons';
import { usePostFooter } from '@/src/components/post/post-footer/use-post-footer';

import styles from './post-footer.module.scss';

type Props = {
  postId: number;
  parentModalOpen?: boolean;
};

export const PostFooter = ({ postId, parentModalOpen }: Props) => {
  const { isSignedIn } = useAuth();
  const { data: post, isLoading } = usePost({ postId });

  const { data } = useUser({ userId: post?.authorId || '' });
  const { isDescriptionLong, shortDescription, showMore, toggleShowMore } =
    usePostFooter({ description: post?.description || '' });

  if (isLoading || !post) {
    return null;
  }

  const { description } = post;

  return (
    <footer className={styles.footer}>
      <PostButtons postId={postId} parentModalOpen={parentModalOpen} />
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
      {isSignedIn && <CommentForm postId={postId} />}
    </footer>
  );
};