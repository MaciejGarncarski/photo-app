import { IconMessage, IconShare } from '@tabler/icons';
import clsx from 'clsx';
import { AnimatePresence, m } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { namedComponent } from '@/utils/namedComponent';

import styles from './postButtons.module.scss';

import { IconHeartWrapper } from '@/components/atoms/icons/IconHeartWrapper';
import { IconStarWrapper } from '@/components/atoms/icons/IconStarWrapper';
import { Loading } from '@/components/atoms/loading/Loading';
import { Tooltip } from '@/components/atoms/tooltip/Tooltip';
import { Children } from '@/components/layout/Layout';
import { usePostLike } from '@/components/molecules/postButtons/usePostLike';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { ShareModal } from '@/components/organisms/shareModal/ShareModal';
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
    <m.button whileTap={{ scale: 0.8 }} type="button" onClick={onClick} className={styles.button}>
      {children}
    </m.button>
  );
};

type ModalState = {
  isOpen: boolean;
  postId: number;
};

export const PostButtons = ({ post }: PostButtonsProps) => {
  const { isLiked, id, isInCollection } = post;
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, postId: 0 });

  const [isSharing, setIsSharing] = useState<boolean>(false);

  const { session } = useAuth();
  const { push } = useRouter();
  const { mutate } = usePostLike();
  const collectionMutation = useCollectionMutation();

  const handleLike = () => {
    if (!session?.user?.id) {
      push('/auth/signin');
      return;
    }

    mutate({ isLiked: isLiked ?? false, userId: session?.user?.id, postId: id });
  };

  const openModal = () => {
    setModalState({ isOpen: true, postId: id });
  };

  const handleCollection = () => {
    if (isInCollection) {
      collectionMutation.mutate({ type: 'remove', postId: id });
      return;
    }

    collectionMutation.mutate({ type: undefined, postId: id });
  };

  const setIsOpen = (isOpen: boolean) => {
    setModalState({ isOpen, postId: id });
  };

  return (
    <ul className={styles.list}>
      <Item>
        <Button onClick={handleLike}>
          <span className="visually-hidden">like</span>
          {isLiked ? <IconHeartWrapper isActive /> : <IconHeartWrapper />}
        </Button>
      </Item>
      <Item>
        <Button onClick={openModal}>
          <span className="visually-hidden">comment</span>
          <IconMessage />
        </Button>
      </Item>
      <Item>
        <Button onClick={() => setIsSharing(true)}>
          <span className="visually-hidden">share</span>
          <IconShare />
        </Button>
      </Item>
      {session?.user && (
        <Item isLast>
          {collectionMutation.isLoading ? (
            <Loading variants={['very-small']} />
          ) : (
            <Tooltip variant="right" content={`${isInCollection ? 'Remove from' : 'Save to'} collection`}>
              <Button onClick={handleCollection}>
                {isInCollection ? <IconStarWrapper isActive /> : <IconStarWrapper />}
              </Button>
            </Tooltip>
          )}
        </Item>
      )}
      {isSharing && (
        <ShareModal setIsOpen={setIsSharing} textToCopy={`https://photo-app-orpin.vercel.app/post/${id}`} />
      )}
      {modalState.isOpen &&
        modalState.postId === id &&
        createPortal(
          <AnimatePresence mode="wait">
            <PostModal post={post} setIsOpen={setIsOpen} />
          </AnimatePresence>,
          document.body,
        )}
    </ul>
  );
};
