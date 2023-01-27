import { IconMenu2 } from '@tabler/icons';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { namedComponent } from '@/utils/namedComponent';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { FollowButton } from '@/components/atoms/followButton/FollowButton';
import { Loading } from '@/components/atoms/loading/Loading';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { ConfirmationAlert } from '@/components/molecules/confirmationAlert/ConfirmationAlert';
import { useDeletePost } from '@/components/molecules/postOptions/useDeletePost';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

import styles from './postHeader.module.scss';

type PostHeaderProps = {
  tag?: 'header' | 'div';
  post: PostData;
  className?: string;
  variant?: 'no-margin-left';
};

export const POST_AVATAR_SIZE = 40;

const PostOptions = dynamic(() => {
  return namedComponent(import('@/components/molecules/postOptions/PostOptions'), 'PostOptions');
});

export const PostHeader = ({ tag: Tag = 'header', post, variant, className }: PostHeaderProps) => {
  const { open, close, modalOpen } = useModal();
  const { open: opeCnonfirmation, close: closeConfirmation, modalOpen: confirmationOpen } = useModal();
  const deletePostMutation = useDeletePost();

  const { session } = useAuth();
  const { data } = useAccount({ userId: session?.user?.id });
  const { data: authorData } = useAccount({ userId: post.author_id });

  const isAuthor = data?.user?.id === post.author_id;

  const handleDeletePost = () => {
    deletePostMutation.mutate({ postId: post.id });
  };

  const headerClassName = clsx(className, variant && styles[variant], styles.header);

  if (!authorData) {
    return (
      <Tag className={headerClassName}>
        <Loading variants={['very-small', 'left']} />
      </Tag>
    );
  }

  return (
    <Tag className={headerClassName}>
      <Link href={`/${authorData.user?.username}`} className={styles.link}>
        <Avatar
          className={styles.avatar}
          userId={authorData.user?.id}
          width={POST_AVATAR_SIZE}
          height={POST_AVATAR_SIZE}
        />
        <h2>{authorData.user?.username}</h2>
      </Link>
      {data && (
        <div className={styles.options}>
          {!isAuthor && <FollowButton className={styles.followBtn} userId={post.author_id} />}
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
