import { IconMenu2 } from '@tabler/icons';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { PostData } from '@/utils/transformPost';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { useDeletePost } from '@/components/molecules/postOptions/useDeletePost';

import styles from './postHeader.module.scss';

import { PostOptions } from '../postOptions/PostOptions';

type PropsTypes = {
  tag?: 'header' | 'div';
  post: PostData;
  className?: string;
  variant?: 'no-margin-left';
};

export const POST_AVATAR_SIZE = 40;

export const PostHeader = ({ tag: Tag = 'header', post, variant, className }: PropsTypes) => {
  const { open, close, modalOpen } = useModal();
  const { open: opeCnonfirmation, close: closeConfirmation, modalOpen: confirmationOpen } = useModal();
  const deletePostMutation = useDeletePost();

  const { authorId, postId } = post;

  const { session, isSignedIn } = useAuth();
  const { username } = useUser({ userId: authorId });

  const isAuthor = session?.user?.id === authorId;

  const handleDeletePost = () => {
    deletePostMutation.mutate({ postId });
  };

  if (!username) {
    return <Tag></Tag>;
  }

  return (
    <Tag className={styles.header}>
      <Link href={`/${username}`} className={styles.userAnchor}>
        <Avatar userId={authorId} width={POST_AVATAR_SIZE} height={POST_AVATAR_SIZE} />
        <h2>{username}</h2>
      </Link>
      {isSignedIn && (
        <div className={styles.options}>
          {!isAuthor && <FollowButton className={styles.followButton} userId={authorId} />}
          <Tooltip variant="right" content="Post menu">
            <button type="button" className={styles.optionsButton} onClick={open}>
              <IconMenu2 />
            </button>
          </Tooltip>
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
