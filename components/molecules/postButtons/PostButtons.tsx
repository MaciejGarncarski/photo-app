import clsx from 'clsx';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { namedComponent } from '@/utils/namedComponent';

import { IconStarWrapper } from '@/components/atoms/icons/IconStarWrapper';
import { ModalContainer } from '@/components/atoms/modal/ModalContainer';
import { useModal } from '@/components/atoms/modal/useModal';
import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { useButtonData } from '@/components/molecules/postButtons/useButtonData';
import { useHandleLike } from '@/components/molecules/postButtons/useHandleLike';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { ShareModal } from '@/components/organisms/shareModal/ShareModal';
import { PostData } from '@/components/pages/collection/useCollection';

import styles from './postButtons.module.scss';

type PostButtonsProps = {
  post: PostData;
};

type ButtonProps = {
  onClick: () => void;
  alt: string;
  icon: ReactNode;
};

const PostModal = dynamic(() => {
  return namedComponent(import('@/components/organisms/postModal/PostModal'), 'PostModal');
});

const Button = ({ icon, onClick, alt }: ButtonProps) => {
  return (
    <li className={styles.item}>
      <motion.button whileTap={{ scale: 0.8 }} type="button" onClick={onClick} className={styles.button}>
        {icon}
        <VisuallyHiddenText text={alt} />
      </motion.button>
    </li>
  );
};

export const PostButtons = ({ post }: PostButtonsProps) => {
  const { isLiked, postId, isInCollection } = post;

  const { modalOpen, open, close } = useModal();
  const { modalOpen: shareModalOpen, open: openShare, close: closeShare } = useModal();
  const { handleLike } = useHandleLike({ post });
  const { buttonData } = useButtonData({ isLiked: Boolean(isLiked), openModal: open, openShare, handleLike });
  const collectionMutation = useCollectionMutation();

  const handleCollection = () => {
    if (isInCollection) {
      collectionMutation.mutate({ type: 'remove', postId });
      return;
    }
    collectionMutation.mutate({ type: undefined, postId });
  };

  return (
    <ul className={styles.list}>
      {buttonData.map(({ alt, icon, onClick }) => {
        return <Button onClick={onClick} alt={alt} icon={icon} key={alt} />;
      })}
      <li className={clsx(styles.itemLast, styles.item)}>
        <Tooltip variant="right" content={`${isInCollection ? 'Remove from' : 'Save to'} collection`}>
          <motion.button whileTap={{ scale: 0.8 }} type="button" onClick={handleCollection} className={styles.button}>
            {isInCollection ? <IconStarWrapper isActive /> : <IconStarWrapper />}
            <VisuallyHiddenText text={isInCollection ? 'remove' : 'add'} />
          </motion.button>
        </Tooltip>
      </li>
      <ModalContainer>
        {shareModalOpen && (
          <ShareModal close={closeShare} textToCopy={`https://photo-app-orpin.vercel.app/post/${postId}`} />
        )}
      </ModalContainer>
      {modalOpen &&
        createPortal(
          <ModalContainer>
            <PostModal post={post} close={close} />
          </ModalContainer>,
          document.body,
        )}
    </ul>
  );
};
