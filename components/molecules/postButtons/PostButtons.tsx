import { IconMessage, IconShare } from '@tabler/icons';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import { createPortal } from 'react-dom';

import { PostData } from '@/utils/transformPost';

import { IconHeartWrapper } from '@/components/atoms/icons/IconHeartWrapper';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { useHandleLike } from '@/components/molecules/postButtons/useHandleLike';
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
  className?: string;
};

export const PostButtons = ({ post, className }: PropsTypes) => {
  const { isLiked, postId, likesCount, commentsCount } = post;

  const { modalOpen, open: openPostModal, close } = useModal();
  const { modalOpen: shareModalOpen, open: openShare, close: closeShare } = useModal();
  const { handleLike } = useHandleLike({ post });

  const likeIcon = <IconHeartWrapper isActive={Boolean(isLiked)} />;

  const buttonData: ButtonData = [
    { alt: 'like', icon: likeIcon, onClick: handleLike, disabled: false, count: likesCount },
    { alt: 'comment', icon: <IconMessage />, onClick: openPostModal, disabled: false, count: commentsCount },
    { alt: 'share', icon: <IconShare />, onClick: openShare, disabled: false },
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
              whileTap={{ scale: 0.8 }}
            >
              {icon}
              <VisuallyHiddenText text={alt} />
              <span className={styles.buttonCount}>{count}</span>
            </motion.button>
          </li>
        );
      })}
      <ModalContainer>
        {shareModalOpen && (
          <ShareModal close={closeShare} textToCopy={`https://photo-app-orpin.vercel.app/post/${postId}`} />
        )}
      </ModalContainer>
      {modalOpen && createPortal(<PostModal post={post} close={close} />, document.body)}
    </ul>
  );
};
