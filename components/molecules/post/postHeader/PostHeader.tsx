import { IconMenu2 } from '@tabler/icons-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { PostData } from '@/utils/apis/transformPost';
import { unlock } from '@/utils/bodyLock';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/buttons/followButton/FollowButton';
import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { useDeletePost } from '@/components/molecules/post/postOptions/useDeletePost';

import styles from './postHeader.module.scss';

import { PostOptions } from '../postOptions/PostOptions';

type PropsTypes = {
  tag?: 'header' | 'div';
  post: PostData;
};

export const POST_AVATAR_SIZE = 50;
dayjs.extend(relativeTime);

export const PostHeader = ({ tag: Tag = 'header', post }: PropsTypes) => {
  const { username } = useUser({ userId: post.authorId });
  const { session, isSignedIn } = useAuth();
  const { open, close, modalOpen } = useModal();
  const { open: opeCnonfirmation, close: closeConfirmation, modalOpen: confirmationOpen } = useModal();
  const deletePostMutation = useDeletePost();

  const { authorId, postId, createdAt } = post;
  const fromNow = dayjs(createdAt).fromNow();

  const isAuthor = session?.user?.id === authorId;

  const onSettled = () => {
    closeConfirmation();
    unlock();
    close();
  };

  const handleDeletePost = () => {
    toast.promise(deletePostMutation.mutateAsync({ postId }, { onSettled }), {
      error: 'Error!',
      loading: 'Deleting post...',
      success: 'Deleted!',
    });
  };

  if (!username) {
    return <Tag></Tag>;
  }

  return (
    <Tag className={styles.header}>
      <Link href={`/${username}`} className={styles.userAnchor}>
        <Avatar userId={authorId} width={POST_AVATAR_SIZE} height={POST_AVATAR_SIZE} />
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
              <button type="button" className={styles.optionsButton} onClick={open}>
                <IconMenu2 />
              </button>
            </Tooltip>
          )}
        </div>
      )}
      <ModalContainer>
        {modalOpen && !confirmationOpen && (
          <PostOptions key="options" post={post} close={close} openCnonfirmation={opeCnonfirmation} />
        )}
        {confirmationOpen && (
          <ConfirmationAlert
            key="confirmation"
            onConfirm={handleDeletePost}
            headingText="Delete post?"
            close={closeConfirmation}
          />
        )}
      </ModalContainer>
    </Tag>
  );
};
