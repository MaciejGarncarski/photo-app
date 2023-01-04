import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { namedComponent } from '@/utils/namedComponent';

import styles from './postButtons.module.scss';

import { Icon } from '@/components/atoms/icons/Icons';
import { Loading } from '@/components/atoms/loading/Loading';
import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { Children } from '@/components/Layout/Layout';
import { usePostLike } from '@/components/molecules/postButtons/usePostLike';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { PostData } from '@/components/pages/collection/useCollection';

type PostButtonsProps = {
  post: PostData;
};

type ItemProps = {
  isLast?: boolean;
} & Children;

type ButtonProps = {
  onClick: () => void;
} & Children;

const PostModal = dynamic(() => {
  return namedComponent(import('@/components/organisms/postModal/PostModal'), 'PostModal');
});

const Item = ({ children, isLast }: ItemProps) => {
  return <li className={clsx(isLast && styles.itemLast, styles.item)}>{children}</li>;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <motion.button whileTap={{ scale: 0.8 }} type="button" onClick={onClick} className={styles.button}>
      {children}
    </motion.button>
  );
};

type ModalState = {
  isOpen: boolean;
  postId: number;
};

export const PostButtons = ({ post }: PostButtonsProps) => {
  const { isLiked, id, isInCollection } = post;
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, postId: 0 });

  const { session } = useAuth();
  const { push } = useRouter();
  const { mutate } = usePostLike();
  const collectionMutation = useCollectionMutation();

  const handleLike = () => {
    if (!session?.user?.id) {
      push('/auth/signin');
      return;
    }

    mutate({ isLiked: isLiked ?? false, userID: session?.user?.id, postID: id });
  };

  const openModal = () => {
    setModalState({ isOpen: true, postId: id });
  };

  const handleCollection = () => {
    if (isInCollection) {
      collectionMutation.mutate({ type: 'remove', postID: id });
      return;
    }

    collectionMutation.mutate({ type: undefined, postID: id });
  };

  const setIsOpen = (isOpen: boolean) => {
    setModalState({ isOpen, postId: id });
  };

  return (
    <ul className={styles.list}>
      <Item>
        <Button onClick={handleLike}>{isLiked ? <Icon.HeartActive /> : <Icon.Heart />}</Button>
      </Item>
      <Item>
        <Button onClick={openModal}>
          <Icon.Comment />
        </Button>
      </Item>
      <Item>
        <Icon.Share />
      </Item>
      {session?.user && (
        <Item isLast>
          {collectionMutation.isLoading ? (
            <Loading variants={['very-small']} />
          ) : (
            <Tooltip variant="right" content={`${isInCollection ? 'Remove from' : 'Save to'} collection`}>
              <Button onClick={handleCollection}>{isInCollection ? <Icon.BookmarkActive /> : <Icon.Bookmark />}</Button>
            </Tooltip>
          )}
        </Item>
      )}
      {modalState.isOpen &&
        modalState.postId === id &&
        createPortal(
          <AnimatePresence>
            <PostModal post={post} setIsOpen={setIsOpen} />
          </AnimatePresence>,
          document.body,
        )}
    </ul>
  );
};
