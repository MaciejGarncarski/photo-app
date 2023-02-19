import { IconMessage, IconShare } from '@tabler/icons';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ReactElement, ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { namedComponent } from '@/utils/namedComponent';

import { IconHeartWrapper } from '@/components/atoms/icons/IconHeartWrapper';
import { IconStarWrapper } from '@/components/atoms/icons/IconStarWrapper';
import { Loading } from '@/components/atoms/loading/Loading';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { PostLikesCount } from '@/components/atoms/postLikesCount/PostLikesCount';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { useHandleLike } from '@/components/molecules/postButtons/useHandleLike';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { ShareModal } from '@/components/organisms/shareModal/ShareModal';
import { PostData } from '@/components/pages/collection/useCollection';

import styles from './postButtons.module.scss';

type ButtonData = Array<{ alt: string; icon: ReactElement; onClick: () => void; disabled: boolean }>;

type PostButtonsProps = {
  post: PostData;
  className?: string;
};

type ButtonProps = {
  onClick: () => void;
  alt: string;
  disabled: boolean;
  icon: ReactNode;
};

const PostModal = dynamic(() => {
  return namedComponent(import('@/components/organisms/postModal/PostModal'), 'PostModal');
});

const Button = ({ icon, onClick, alt, disabled }: ButtonProps) => {
  return (
    <li className={styles.item}>
      <motion.button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={styles.button}
        whileTap={{ scale: 0.8 }}
      >
        {icon}
        <VisuallyHiddenText text={alt} />
      </motion.button>
    </li>
  );
};

export const PostButtons = ({ post, className }: PostButtonsProps) => {
  const { isLiked, postId, isInCollection } = post;

  const { modalOpen, open: openPostModal, close } = useModal();
  const { modalOpen: shareModalOpen, open: openShare, close: closeShare } = useModal();
  const { handleLike } = useHandleLike({ post });
  const collectionMutation = useCollectionMutation();

  const handleCollection = () => {
    if (isInCollection) {
      collectionMutation.mutate({ type: 'remove', postId });
      return;
    }
    collectionMutation.mutate({ type: undefined, postId });
  };

  const likeIcon = <IconHeartWrapper isActive={Boolean(isLiked)} />;
  const starIcon = collectionMutation.isLoading ? (
    <Loading variants={['very-small']} />
  ) : (
    <IconStarWrapper isActive={Boolean(isInCollection)} />
  );

  const buttonData: ButtonData = [
    { alt: 'like', icon: likeIcon, onClick: handleLike, disabled: false },
    { alt: 'comment', icon: <IconMessage />, onClick: openPostModal, disabled: false },
    { alt: 'share', icon: <IconShare />, onClick: openShare, disabled: false },
    {
      alt: isInCollection ? 'remove' : 'add',
      icon: starIcon,
      onClick: handleCollection,
      disabled: collectionMutation.isLoading,
    },
  ];

  return (
    <div>
      <ul className={clsx(className, styles.list)}>
        {buttonData.map(({ alt, icon, onClick, disabled }) => {
          return <Button onClick={onClick} alt={alt} icon={icon} key={alt} disabled={disabled} />;
        })}
        <ModalContainer>
          {shareModalOpen && (
            <ShareModal close={closeShare} textToCopy={`https://photo-app-orpin.vercel.app/post/${postId}`} />
          )}
        </ModalContainer>
        {modalOpen && createPortal(<PostModal post={post} close={close} />, document.body)}
      </ul>
      <PostLikesCount likesCount={post.likesCount} className={styles.likesCount} />
    </div>
  );
};
