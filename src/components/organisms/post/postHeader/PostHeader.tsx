import { IconMenu2 } from '@tabler/icons-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/src/hooks/useAuth';
import { useModal } from '@/src/hooks/useModal';
import { useUser } from '@/src/hooks/useUser';
import { PostData } from '@/src/utils/apis/transformPost';
import { unlock } from '@/src/utils/bodyLock';
import { formatDate } from '@/src/utils/formatDate';

import { Tooltip } from '@/src/components/atoms/tooltip/Tooltip';

import { Avatar } from '@/src/components/molecules/avatar/Avatar';
import { FollowButton } from '@/src/components/molecules/followButton/FollowButton';

import { ConfirmationAlert } from '@/src/components/organisms/confirmationAlert/ConfirmationAlert';
import { useDeletePost } from '@/src/components/organisms/post/postOptions/useDeletePost';

import styles from './postHeader.module.scss';

import { PostOptions } from '../postOptions/PostOptions';

type PropsTypes = {
  tag?: 'header' | 'div';
  post: PostData;
};

export const PostHeader = ({ tag: Tag = 'header', post }: PropsTypes) => {
  const { username } = useUser({ userId: post.authorId });
  const { session, isSignedIn } = useAuth();
  const menuModal = useModal();
  const confirmationModal = useModal();
  const deletePostMutation = useDeletePost();

  const { authorId, postId, createdAt } = post;
  const fromNow = formatDate(createdAt);

  const isAuthor = session?.user?.id === authorId;

  const onSettled = () => {
    confirmationModal.closeModal();
    menuModal.closeModal();
    unlock();
  };

  const handleDeletePost = () => {
    toast.promise(deletePostMutation.mutateAsync({ postId }, { onSettled }), {
      error: 'Error!',
      loading: 'Deleting post...',
      success: 'Deleted!',
    });
  };

  if (!username) {
    return null;
  }

  return (
    <Tag className={styles.header}>
      <Link href={`/${username}`} className={styles.userAnchor}>
        <Avatar userId={authorId} size="small" />
        <div>
          <h2 className={styles.username}>{username}</h2>
          <p>
            <time dateTime={createdAt.toString()}>{fromNow}</time>
          </p>
        </div>
      </Link>
      {isSignedIn && (
        <div className={styles.options}>
          {!isAuthor && <FollowButton userId={authorId} />}
          {isAuthor && (
            <Tooltip variant="right" content="Post options">
              <button type="button" className={styles.optionsButton} onClick={menuModal.openModal}>
                <IconMenu2 />
              </button>
            </Tooltip>
          )}
        </div>
      )}
      <PostOptions
        isVisible={menuModal.isModalOpen && !confirmationModal.isModalOpen}
        key="options"
        post={post}
        closeModal={menuModal.closeModal}
        openCnonfirmation={confirmationModal.openModal}
      />
      <ConfirmationAlert
        isVisible={confirmationModal.isModalOpen}
        key="confirmation"
        onConfirm={handleDeletePost}
        headingText="Delete post?"
        closeModal={confirmationModal.closeModal}
      />
    </Tag>
  );
};
