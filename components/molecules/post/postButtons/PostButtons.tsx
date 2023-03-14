import { IconMessage, IconShare } from '@tabler/icons';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import { createPortal } from 'react-dom';

import { lock } from '@/utils/bodyLock';
import { PostData } from '@/utils/transformPost';

import { IconHeartWrapper } from '@/components/atoms/icons/IconHeartWrapper';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { ModalContainer } from '@/components/molecules/modal/ModalContainer';
import { useModal } from '@/components/molecules/modal/useModal';
import { useHandleLike } from '@/components/molecules/post/postButtons/useHandleLike';
import { PostModal } from '@/components/organisms/postModal/PostModal';
import { ShareModal } from '@/components/organisms/shareModal/ShareModal';

import styles from './postButtons.module.scss';

type ButtonData = Array<{
  alt: string;
  icon: ReactElement;
  onClick: () => void;
  disabled: boolean;
  count?: number;
}>;

type PropsTypes = {
  post: PostData;
  parentModalOpen?: boolean;
};

export const PostButtons = ({ post, parentModalOpen }: PropsTypes) => {
  const { isLiked, postId, likesCount, commentsCount } = post;

  const postModal = useModal();
  const shareModal = useModal();
  const { handleLike } = useHandleLike({ post });

  const likeIcon = <IconHeartWrapper isActive={Boolean(isLiked)} />;

  const postModalOpen = () => {
    postModal.open();
    lock();
  };

  const buttonData: ButtonData = [
    { alt: 'like', icon: likeIcon, onClick: handleLike, disabled: false, count: likesCount },
    {
      alt: 'comment',
      icon: <IconMessage />,
      onClick: parentModalOpen ? () => null : postModalOpen,
      disabled: false,
      count: commentsCount,
    },
    { alt: 'share', icon: <IconShare />, onClick: shareModal.open, disabled: false },
  ];

  return (
    <ul className={styles.list}>
      {buttonData.map(({ alt, icon, onClick, disabled, count }) => {
        return (
          <li key={alt} className={styles.listItem}>
            <motion.button
              className={styles.button}
              type="button"
              disabled={disabled}
              onClick={onClick}
              whileTap={{ scale: 0.6, transition: { type: 'tween', duration: 0.1 } }}
            >
              {icon}
              <VisuallyHiddenText text={alt} />
              <span className={styles.buttonCount}>{count}</span>
            </motion.button>
          </li>
        );
      })}
      <ModalContainer>
        {shareModal.modalOpen && (
          <ShareModal close={shareModal.close} textToCopy={`https://photo-app-orpin.vercel.app/post/${postId}`} />
        )}
      </ModalContainer>
      {postModal.modalOpen &&
        createPortal(<PostModal modalOpen={postModal.modalOpen} post={post} close={postModal.close} />, document.body)}
    </ul>
  );
};
